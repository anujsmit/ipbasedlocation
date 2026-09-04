const axios = require("axios");

async function getPublicIP() {
    try {
        const response = await axios.get("https://api.ipify.org?format=json");

        return response.data.ip;
    } catch (error) {
        throw new Error("Unable to detect public IP address");
    }
}

async function getLocation(ip) {
    try {
        if (!ip) {
            ip = await getPublicIP();
        }

        const response = await axios.get(`https://ipwho.is/${ip}`);

        const data = response.data;

        if (!data.success) {
            throw new Error(data.message || "Unable to find IP location");
        }

        return {
            ip: data.ip,
            country: data.country,
            countryCode: data.country_code,
            region: data.region,
            city: data.city,
            postalCode: data.postal,
            latitude: data.latitude,
            longitude: data.longitude,
            timezone: data.timezone?.id,
            isp: data.connection?.isp
        };
    } catch (error) {
        throw new Error(
            error.response?.data?.message ||
            error.message ||
            "Failed to fetch IP location"
        );
    }
}

module.exports = {
    getPublicIP,
    getLocation
};