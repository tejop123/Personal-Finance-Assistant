# Personal Finance Assistance Web App

This project is a **Personal Finance Assistance Web App** designed to help users track expenses, manage budgets, and gain insights into their financial habits. Built with **React (TypeScript)**, **Supabase** as the backend, and styled using **TailwindCSS**, the app includes user authentication, expense tracking, and financial analytics.
# Live Demo
https://personal-finance-assistant-psi.vercel.app/

## Features

1. **User Authentication**: 
   - Sign up and log in functionality using Supabase.

2. **Expense Tracker**:
   - Add, categorize, and view logged expenses.
   - Display expenses with category and description.

3. **Investment Insights**:
   - Portfolio details and integration with market data APIs (upcoming).

4. **Financial Analytics**:
   - Detailed financial summaries.
   - Custom date range filtering for expense insights.

## Installation

### Prerequisites

- Node.js and npm installed on your system.
- Supabase account and project setup.
- TailwindCSS integrated into the project.

### Setup Instructions

1. **Clone the Repository:**

   ```bash
   git clone https://github.com/your-repo-name/personal-finance-app.git
   cd personal-finance-app
   ```

2. **Install Dependencies:**

   ```bash
   npm install
   ```

3. **Setup Supabase:**

   - Create a new Supabase project.
   - Create a table named `expenses` with the following schema:

     | Column Name | Type       | Default           |
     |-------------|------------|-------------------|
     | id          | UUID       | gen_random_uuid() |
     | amount      | Decimal    |                   |
     | category    | Text       |                   |
     | description | Text       |                   |
     | created_at  | Timestamp  | now()             |

   - Update the `supabaseClient.ts` file with your Supabase project credentials:

     ```ts
     import { createClient } from '@supabase/supabase-js';

     const supabaseUrl = 'https://your-supabase-url.supabase.co';
     const supabaseKey = 'your-anon-or-service-role-key';

     export const supabase = createClient(supabaseUrl, supabaseKey);
     ```

4. **Start the Development Server:**

   ```bash
   npm run dev
   ```

5. **Open the App:**

   Visit [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```plaintext
.
├── public         # Static assets
├── src
│   ├── components # Reusable components
│   ├── pages      # App pages (Landing, Dashboard, etc.)
│   ├── styles     # TailwindCSS configuration and custom styles
│   ├── types      # TypeScript types
│   └── utils      # Utility functions and helpers
├── supabaseClient.ts # Supabase client setup
├── tailwind.config.js # TailwindCSS configuration
├── package.json   # Dependencies and scripts
└── README.md      # Project documentation
```

## Scripts

- `npm run dev` - Start the development server.
- `npm run build` - Build the project for production.
- `npm run lint` - Run linter checks.

## Upcoming Features

- **Investment Insights**: Integrate APIs for real-time market data.
- **Budget Management**: Add budget creation and tracking functionality.
- **Notifications**: Alerts for overspending or meeting financial goals.

## Contributing

Contributions are welcome! Please fork the repository, make your changes, and submit a pull request.

## License

This project is licensed under the [MIT License](LICENSE).

---

**Enjoy tracking your finances effortlessly!**
