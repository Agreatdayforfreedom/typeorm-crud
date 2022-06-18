import 'reflect-metadata';
import app from './app';
import { AppDataSource } from './database';

async function main() {
    try {
        await AppDataSource.initialize();
        app.listen(4000, () => { console.log('listening on port 4000'); });
        
    } catch (error) {
        console.log(error)
    }
}

main();