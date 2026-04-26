import('node-fetch').then(({default: fetch}) => {
  fetch('https://mernpixel.onrender.com/api/admin/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username: "MERNpixel@admin", password: "Mern@123" })
  }).then(r => r.json()).then(console.log)
})
