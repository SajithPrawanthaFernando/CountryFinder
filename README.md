# 🌍 Country Finder

A beautifully designed React + Next.js app that lets users explore countries, cultures, and topics. Features include user authentication, country-specific pages, Radix UI modals, and smooth page animations.

---

## 🚀 Features

- 🔒 Secure Login and Signup using Axios and Context API
- 🌎 Browse countries and cultural topics
- 🔍 Search and Select via Radix UI Select
- 🌐 Responsive, mobile-first layout with TailwindCSS
- ✅ Fully unit-tested and integration-tested with Jest and React Testing Library

---

## 📦 Tech Stack

- **Framework:** Next.js (App Router)
- **Styling:** TailwindCSS, Radix UI, Lucide Icons
- **State:** Context API + React Hooks
- **Form Validation:** React Hook Form + Yup
- **Testing:** Jest + React Testing Library

---

## 🛠️ Setup Instructions

1. **Clone the repo**

```bash
git clone https://github.com/SE1020-IT2070-OOP-DSA-25/af-2-IT22152428.git
cd country-explorer
```

2. **Install dependencies**

```bash
npm install
```

3. **Run the development server**

```bash
npm run dev
```

4. **Build for production**

```bash
npm run build
npm run start
```

## 🧪 Testing

Run the tests using:

```bash
npm run test
```

Test coverage includes:

- Login/Signup modals
- Header UI and interactions
- Hero section routing
- Topic and country display components

---

## 📘 API Usage

This application connects to both internal authentication APIs and external country data APIs.

### Internal Endpoints

```
POST /login
POST /register
POST /logout
POST /users/:email/unfav
POST /users/:email/fav
```

### External API (REST Countries)

Used to fetch and filter country information dynamically.

#### Example Request (Initial Fetch):

```
GET https://restcountries.com/v3.1/all?fields=name,flags,region,capital,population
```

#### Example Request (Filter by Region):

```
GET https://restcountries.com/v3.1/region/asia
```

#### Example Request (Search by Name):

```
GET https://restcountries.com/v3.1/name/sri%20lanka
```

### Notes

- API responses are handled using `fetch()` inside React components.
- Search filters include: `name`, `capital`, `region`, `subregion`, `currency`, `lang`, `translation`, `code`, `codes`, and `fullText`.
- Filtering is reactive and paginated on the frontend (12 items per page).

## 🙌 Contributing

Pull requests are welcome! Please open an issue first to discuss any major changes.

---

## 📝 License

MIT License. See `LICENSE` file for details.
