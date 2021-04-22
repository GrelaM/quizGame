const randomQuestions = [
    {
        category: 'Names',
        question: 'Who are we talking about?',
        hints: [
            'He was a shepherd, musician and soldier.',
            'We was a second king of Israel',
            'He fought Goliath.'
        ],
        answers: [
            { code: 1, value: 'David' },
            { code: 2, value: 'Saul' },
            { code: 3, value: 'Paul' },
            { code: 4, value: 'Moses' }
        ],
        nextQuestion: true
    },
    {
        category: 'Names',
        question: 'Who are we talking about?',
        hints: [
            `He is God's “the only-begotten son”.`,
            'He came to the Earth.',
            'He gave His life as a ransom sacrifice.'
        ],
        answers: [
            { code: 1, value: 'Jesus' },
            { code: 2, value: 'Peter' },
            { code: 3, value: 'David' },
            { code: 4, value: 'Moses' }
        ],
        nextQuestion: true
    },
    {
        category: 'Names',
        question: 'Who are we talking about?',
        hints: [
            'Sheep owner who pastured his flock in Carmel of Judah.',
            `David's men had protected his flock.`,
            `Abigail was his wife`
        ],
        answers: [
            { code: 1, value: 'Nabal' },
            { code: 2, value: 'Salomon' },
            { code: 3, value: 'Esau' },
            { code: 4, value: 'Amos' }
        ],
        nextQuestion: true
    },
    {
        category: 'Names',
        question: 'Who are we talking about?',
        hints: [
            'One of the formost prophets of Israel',
            'Fed by Ravens.',
            `He resurrected the widow's son.`
        ],
        answers: [
            { code: 1, value: 'Elijah' },
            { code: 2, value: 'Isaiah' },
            { code: 3, value: 'Elisha' },
            { code: 4, value: 'Jesus' }
        ],
        nextQuestion: false
    }
]

export default randomQuestions;
