import axios from "axios";

/**
 * class representing a user session fetch data
 */
export default class UserSessionService {
    /**
     * fetch the user informations 
     * 
     * @param {number} userId 
     * @returns {void}
     */
    constructor(userId) {
        //user informations end point
        this.endpoint = `http://localhost:3000/user/${userId}/average-sessions`;

        //user informations data
        this.data = [];
    }

    /**
     * fetch the user data
     * 
     * @returns {void}
     */
    async request() {
        const { data } = await axios({
			method: 'get',
			url: this.endpoint,
			data: {
				id: this.userId
			}
		});

        this.data = data.data;
    }

    /**
     * return the user sessions data
     * 
     * @returns {Promise}
     */
    async getSessionTime() {

        await this.request();

        return await this.data.sessions;
    }
}