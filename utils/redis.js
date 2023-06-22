
import { createClient } from 'redis';
import {promisify} from "util";
class RedisClient{
    constructor(){
        this.client = createClient()
        this.client.on("error", function(error){
            console.log("Redis client not connected to the server: " + error)
        })
    }

    isAlive() {
        return this.client.connected
    }

    async get(key){
        const asyncget = promisify(this.client.get).bind(this.client)
        const value = await asyncget(key)
        return value
    }

    async set(key, value, time){
        const asyncset = promisify(this.client.set).bind(this.client)
        await asyncset(key,value)
        await this.client.expire(time)
    }

    async del(key){
        const asyncdel = promisify(this.client.del).bind(this.client)
        await asyncdel(key)
    }
}

const redisClient = new RedisClient()

module.exports = redisClient