## Redis Pub/Sub Server
This project is a simple API client for retrieving cryptocurrency data from the CoinGecko API. It allows you to fetch real-time price data for different cryptocurrencies such as Bitcoin and Ethereum. The data can be accessed in a structured JSON format.
![Screenshot 2024-12-08 234154](https://github.com/user-attachments/assets/91ae6123-82db-49ab-9a3d-ee4bc95008e2)

## Features

- **Real-time Data Fetching**: Access the latest cryptocurrency prices in USD from the CoinGecko API.
- **Supports Multiple Cryptocurrencies**: Fetch data for a variety of cryptocurrencies like Bitcoin, Ethereum, and more.
- **Decoupled Communication**: Employs a **Publish/Subscribe (Pub/Sub) Architecture** to enable real-time data updates. This architecture decouples publishers (data sources) from subscribers (clients), allowing efficient message distribution without direct dependencies.
- **Scalable Data Distribution**: Use a broker/server to manage and route messages between publishers and subscribers, ensuring data reaches all interested parties.

### Pub/Sub Architecture
This project uses a Pub/Sub model to enable real-time data updates:
- **Publisher** sends data updates without knowing who the subscribers are.
- **Subscribers** listen for updates and react accordingly.
- **Broker/Server** routes messages between publishers and subscribers, facilitating efficient communication.
