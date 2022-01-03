const apiConfig = {
    baseURL: 'https://api.themoviedb.org/3',
    key: '91416296dde484c80b73e21397eac667',
    originalImage: (imgPath) => `https://image.tmdb.org/t/p/original/${imgPath}`,
    w500Image: (imgPath) => `https://image.tmdb.org/t/p/w500/${imgPath}`,
}

export default apiConfig;