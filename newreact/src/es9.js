const urls = [
    'https://jsonplaceholder.typicode.com/users',
    'https://jsonplaceholder.typicode.com/posts',
    'https://jsonplaceholder.typicode.com/albums'
]

const data = urls.map(url => fetch(url)
    .then(result => result.json())
    .then(result2=> console.log(result2))
    )

    