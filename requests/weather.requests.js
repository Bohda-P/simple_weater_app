const rp = require('request-promise')


module.exports = async function (city = '') {
    if (!city) {
      throw new Error('Field can not be empty')
    }
    const KEY_API = '643b5f5ffc60e7a5a0ae1040b3216bb8'
    const uri = `http://api.openweathermap.org/data/2.5/weather`

    const options = {
        uri,
        qs: {
            appid: KEY_API,
            q: city,
            units: 'imperial'
        },
        json: true
    }
    try {
        const data = await rp(options)
        const celsius = Math.round((data.main.temp - 32) * 5/9)
        return {
            weather: `${data.name}: ${celsius}`,
            error: null
        }
    } catch (error) {
        return {
             weather: null, 
             error: error.error.message
        }
    }
 
}