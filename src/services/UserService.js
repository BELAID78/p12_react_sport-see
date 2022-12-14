import axios from "axios";
import { Env } from "../config/env";
import data from "./../data/user_data";

/**
 * class representing a user fetch infos data
 */
export default class UserService {

    /**
     * init the needed data
     * 
     * @param {number} userId 
     * @returns {void}
     */
    constructor(userId) {
        //set user id
        this.userId = userId;

        //user informations end point
        this.endpoint = `http://localhost:3000/user/${userId}`;

        //user informations data
        this.data = [];
    }

    /**
     * fetch the user data
     * 
     * @returns {void}
     */
    async request() {
        //request by using api call
        if(Env.envirement === 'api') {
            const { data } = await axios({
                method: 'get',
                url: this.endpoint,
                data: {
                    id: this.userId
                }
            });
    
            this.data = data.data;
        }else{
            //request data by import it from data file
            const {foundedData} = await Promise.resolve({ foundedData: data.user_main_data.find(item => item.id === this.userId)});

            this.data = foundedData
        }
    }

    /**
     * get the user informations
     * 
     * @returns {Promise}
     */
    async getUserInformations() {
        await this.request();

        return await this.data.userInfos;
    }

    /**
     * get the user completetion objectif 
     * 
     * @returns {Promise}
     */
    async getCompletetionObjectif() {
        await this.request();

        if('score' in this.data) {
            return await this.data.score;
        }

        return await this.data.todayScore;
    }

    /**
     * get the user key data
     * 
     * @returns {Promise}
     */
    async getKeyData() {
        await this.request();

        return await this.data.keyData;
    }
}