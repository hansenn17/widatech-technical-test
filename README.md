# widatech-technical-test

## Overview

This project was created using NodeJS version 22.11.0 with ExpressJS framework, i use postgres as the relational database management system (RDBMS).

## Setting up local environment

1. Create `.env` file, you can refer to `.env.example`
2. Create the database manually with the name exactly as you put in `DB_NAME` field in `.env` file, no need to create the table because it will be created automatically when the application start
3. Go into `express` directory: `CD express/`
4. Create uploads directory: `mkdir uploads` for invoice upload
5. Run `npm install` to install all the dependencies
6. Run `npm run dev` to run the application on your local machine

## Postman collection v2.1 JSON

I also push the json file for this Postman collection into this repository

```
{
	"info": {
		"_postman_id": "f8061023-9936-4e5d-847e-aa361de54092",
		"name": "widatech-technical-test",
		"schema": "https://schema.getpostman.com/json/collection/v2.1.0/collection.json",
		"_exporter_id": "10417620"
	},
	"item": [
		{
			"name": "get invoices",
			"protocolProfileBehavior": {
				"disableBodyPruning": true
			},
			"request": {
				"method": "GET",
				"header": [],
				"body": {
					"mode": "raw",
					"raw": "",
					"options": {
						"raw": {
							"language": "json"
						}
					}
				},
				"url": {
					"raw": "{{baseUrl}}/api/invoice?date=2024-01-01&page=1&size=3",
					"host": [
						"{{baseUrl}}"
					],
					"path": [
						"api",
						"invoice"
					],
					"query": [
						{
							"key": "date",
							"value": "2024-01-01"
						},
						{
							"key": "page",
							"value": "1"
						},
						{
							"key": "size",
							"value": "3"
						}
					]
				}
			},
			"response": []
		},
		{
			"name": "create invoices",
			"request": {
				"method": "POST",
				"header": [],
				"body": {
					"mode": "raw",
					"raw": "{\r\n    \"date\": \"2024-01-01\",\r\n    \"customerName\": \"Hansen\",\r\n    \"salesPersonName\": \"Joe\",\r\n    \"paymentType\": \"CASH\",\r\n    \"notes\": \"this is note 0\",\r\n    \"listOfProductsSold\": [\r\n        {\r\n            \"itemName\": \"Headphone\",\r\n            \"quantity\": 2,\r\n            \"totalCostOfGoodsSold\": 100000,\r\n            \"totalPriceSold\": 150000\r\n        }\r\n    ]\r\n}",
					"options": {
						"raw": {
							"language": "json"
						}
					}
				},
				"url": {
					"raw": "{{baseUrl}}/api/invoice",
					"host": [
						"{{baseUrl}}"
					],
					"path": [
						"api",
						"invoice"
					]
				}
			},
			"response": []
		},
		{
			"name": "update invoice",
			"request": {
				"method": "PUT",
				"header": [],
				"body": {
					"mode": "raw",
					"raw": "{\r\n    \"date\": \"2024-01-01\",\r\n    \"customerName\": \"Hansen\",\r\n    \"salesPersonName\": \"Joe\",\r\n    \"paymentType\": \"CASH\",\r\n    \"notes\": \"updated note 3\"\r\n}",
					"options": {
						"raw": {
							"language": "json"
						}
					}
				},
				"url": {
					"raw": "{{baseUrl}}/api/invoice/:invoiceNumber",
					"host": [
						"{{baseUrl}}"
					],
					"path": [
						"api",
						"invoice",
						":invoiceNumber"
					],
					"variable": [
						{
							"key": "invoiceNumber",
							"value": "9de06334-8e6e-4276-8f2c-64cf62a2db34"
						}
					]
				}
			},
			"response": []
		},
		{
			"name": "delete invoice",
			"request": {
				"method": "DELETE",
				"header": [],
				"body": {
					"mode": "raw",
					"raw": "{\r\n    \"date\": \"2024-01-01\",\r\n    \"customerName\": \"Hansen\",\r\n    \"salesPersonName\": \"Joe\",\r\n    \"paymentType\": \"CASH\",\r\n    \"notes\": \"\",\r\n    \"listOfProductsSold\": [\r\n        {\r\n            \"itemName\": \"Speaker\",\r\n            \"quantity\": 1,\r\n            \"totalCostOfGoodsSold\": 100000,\r\n            \"totalPriceSolde\": 150000\r\n        }\r\n    ]\r\n}",
					"options": {
						"raw": {
							"language": "json"
						}
					}
				},
				"url": {
					"raw": "{{baseUrl}}/api/invoice/:invoiceNumber",
					"host": [
						"{{baseUrl}}"
					],
					"path": [
						"api",
						"invoice",
						":invoiceNumber"
					],
					"variable": [
						{
							"key": "invoiceNumber",
							"value": "1d2da597-4362-4f2a-844f-0ae08939349f"
						}
					]
				}
			},
			"response": []
		},
		{
			"name": "upload invoices",
			"request": {
				"method": "POST",
				"header": [],
				"body": {
					"mode": "formdata",
					"formdata": [
						{
							"key": "file",
							"type": "file",
							"src": "/C:/Users/hanse/Downloads/InvoiceImport-2-correct.xlsx"
						}
					]
				},
				"url": {
					"raw": "{{baseUrl}}/api/invoice/upload",
					"host": [
						"{{baseUrl}}"
					],
					"path": [
						"api",
						"invoice",
						"upload"
					]
				}
			},
			"response": []
		}
	]
}
```
