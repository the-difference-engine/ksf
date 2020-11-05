import axios from 'axios'

const fetchNomination = (id) => {
    axios.get(`/nomination/${id}`)
        .then(function (response) {
            console.log(response)
            const nomination = response.data.nomination
            return nomination
        })
        .catch(function (err) {
            console.log(err)
        })
        .then(function() {
        })
}

export default fetchNomination