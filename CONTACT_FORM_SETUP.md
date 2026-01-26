# Contact Form Setup Guide

## Option 1: Formspree (Easiest - Free)

1. Go to https://formspree.io
2. Sign up for free account
3. Create a new form
4. Copy your form endpoint (looks like: https://formspree.io/f/YOUR_FORM_ID)
5. Update index.html form tag:
   ```html
   <form class="contact-form glass-card" action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
   ```
6. Add name attributes to inputs:
   ```html
   <input type="text" name="name" placeholder="👤 Your Name" required>
   <input type="email" name="email" placeholder="📧 Your Email" required>
   <textarea name="message" placeholder="💬 Your Message" rows="5" required></textarea>
   ```

## Option 2: EmailJS (Free - 200 emails/month)

1. Go to https://www.emailjs.com
2. Sign up and create email service
3. Get your Service ID, Template ID, and Public Key
4. Add EmailJS SDK to index.html (before closing </body>):
   ```html
   <script src="https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js"></script>
   ```
5. Update script.js with EmailJS code (see below)

## Option 3: Netlify Forms (If hosting on Netlify)

1. Add `netlify` attribute to form:
   ```html
   <form class="contact-form glass-card" name="contact" method="POST" data-netlify="true">
   ```
2. Add hidden input:
   ```html
   <input type="hidden" name="form-name" value="contact">
   ```
3. Deploy to Netlify - forms work automatically!

## Recommended: Formspree (Simplest)

It's the easiest and works immediately. Just update the form action URL and you'll get emails!
