const generateQuiz = (title, genre, creatorId, songs) => {
    return {
        title: title,
        genre: genre,
        creator: { oid: creatorId },
        songsLength: songs.length,
        songs: songs.map((item) => {
            return { oid: item };
        }),
    };
};

// How many quizzes to generate
const quizAmount = 100;

const users = ["5fae960bf6bdf80024d0f69d", "5fae961bf6bdf80024d0f69e", "5fae962df6bdf80024d0f69f"];

const genres = ["pop", "rock", "electronic", "hip-hop", "classical", "rnb", "blues", "metal"];

const songs = [
    "5fad5c8f090c820023e915ca",
    "5fad5c8f090c820023e915c9",
    "5fad5c8f090c820023e915c8",
    "5fad5c8f090c820023e915c7",
    "5fad5c8f090c820023e915c6",
    "5fad5c8f090c820023e915c5",
    "5fad5c8f090c820023e915c4",
    "5fad5c8f090c820023e915c3",
    "5fad5c8f090c820023e915c2",
    "5fad5c8f090c820023e915c1",
    "5fad5c8f090c820023e915c0",
    "5fad5c8f090c820023e915bf",
    "5fad5c8f090c820023e915be",
    "5fad5c8f090c820023e915bd",
    "5fad5c8f090c820023e915bc",
    "5fad5c8f090c820023e915bb",
    "5fad5c8f090c820023e915ba",
    "5fad5c8f090c820023e915b9",
    "5fad5c8f090c820023e915b8",
];

const generateQuizzes = (quantity) => {
    const quizzes = [];

    for (let i = 0; i < quantity; i++) {
        const title = `Test Quiz ${i}`;

        const genre = genres[Math.floor(Math.random() * genres.length)];
        const creator = users[Math.floor(Math.random() * users.length)];
        const songsLength = Math.max(Math.floor(Math.random() * songs.length), 1);

        let songList = [];

        for (let j = 0; j < songsLength; j++) {
            songList.push(songs[j]);
        }

        const quiz = generateQuiz(title, genre, creator, songList);

        quizzes.push(quiz);
    }

    console.log(quizzes);
    return quizzes;
};

//exports.module = generateQuizzes(quizAmount);
