# calendly-clone

Calendly Core Logic

Based on [@imrenagi](https://www.youtube.com/watch?v=wQNzh1LhhKQ) calendly core logic video

Conclusion:
- tidak bisa lanjut ke tahap timezone menggunakan native `Date` karena hanya support UTC dan timezone user
- setidaknya harus menggunakan library seperti `date-fns`, `day.js`.