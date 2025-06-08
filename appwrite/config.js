import { Client, Account, Databases, ID } from 'appwrite';

const client = new Client();
client
  .setEndpoint('https://fra.cloud.appwrite.io/v1') 
  .setProject('68447bc3002e9c9853ce');

const account = new Account(client);
const databases = new Databases(client);

export { client, account, databases, ID };
