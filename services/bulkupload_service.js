const csv = require('fast-csv')
const fs = require('fs')
const util = require('util')
const readFile = util.promisify(fs.readFile);
const ProductService = require('../services/products_service')
const fsPromises = require('fs').promises

class BulkUpload {
    constructor() {

    }

    async processCsvFile(filePath) {
        try {
            console.log(filePath)
            const fileContent = await readFile(filePath, 'utf8');
            return new Promise((resolve, reject) => {
                const csvData = [];
                const fileStream = csv.parse()
                    .on('data', function (data) {
                        csvData.push(data);
                    })
                    .on('end', function () {
                        // Remove header
                        csvData.shift();
                        console.log(csvData);
                        resolve(csvData);
                    })
                    .on('error', function (error) {
                        reject(error);
                    });
                const readableStream = fs.createReadStream(filePath, 'utf8');
                readableStream.pipe(fileStream);
            });
        } catch (error) {
            console.error('Error reading the file:', error);
            throw error;
        }
    }

    async uploadBulkData(filePath) {
        try {
            const productServiceObj = new ProductService();
            const csvData = await this.processCsvFile(filePath);

            // Process the parsed CSV data
            const productsJson = csvData.map(product => ({
                "part_no": product[0],
                "description": product[1],
                "MRP": product[2],
                "std_pkg": product[3],
                "master_pkg": product[4],
                "qty": product[5] === "" ? '50' : product[5],
            }));

            // Insert products into MySQL
            const promises = productsJson.map(async (product) => {
                try {
                    const result = await productServiceObj.createNewProduct(product);
                    return { product, result };
                } catch (error) {
                    return { product, error: error.message };
                }
            });

            const results = await Promise.all(promises);

            const successResults = results.filter(result => !result.error);
            const failureResults = results.filter(result => result.error);

            console.log('Successful insertions:', successResults);
            console.log('Failed insertions:', failureResults);

            // Delete the file after processing
            await fsPromises.unlink(filePath);
            console.log('File deleted successfully:', filePath);

            return { successResults, failureResults };
        } catch (error) {
            console.error('Error processing CSV file:', error);
            throw error;
        }
    }

}

module.exports = BulkUpload;