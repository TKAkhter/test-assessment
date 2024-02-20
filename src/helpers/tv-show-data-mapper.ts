export const imdbTvShowDataMapper = (object: any) => {
    return {
        "Title": object.title,
        "Year": object._yearData,
        "Rated": object.rated,
        "Released": object.released,
        "Runtime": object.runtime,
        "Genre": object.genres,
        "Director": object.director,
        "Writer": object.writer,
        "Actors": object.actors,
        "Plot": object.plot,
        "Language": object.languages,
        "Country": object.country,
        "Awards": object.awards,
        "Poster": object.poster,
        "Ratings": object.ratings,
        "Metascore": object.metascore,
        "imdbRating": object.rating,
        "imdbVotes": object.votes,
        "imdbID": object.imdbid,
        "Type": object.type,
        "totalSeasons": object.totalseasons,
        "Response": "True"
    }
}