# Learner Dashboard

A React-based dashboard for tracking learner progress and component status, with AWS S3 backend for data storage.

## Features

- 📚 Track learning components and their status
- 👤 Select from multiple learners
- 🔐 Secure authentication with cookie-based auth
- ☁️ AWS S3 backend for learner data storage
- ⚠️ Overdue component detection
- 📊 Sortable component table

## Prerequisites

- Node.js (v14 or later)
- AWS CLI configured with appropriate permissions
- AWS CDK installed globally (`npm install -g aws-cdk`)

## Quick Start

1. **Clone the repository:**
   ```bash
   git clone https://github.com/DrPBaksh/learner-dashboard.git
   cd learner-dashboard
   ```

2. **Run the setup script:**
   ```bash
   chmod +x setup.sh
   ./setup.sh
   ```

3. **Start the development server:**
   ```bash
   cd frontend
   npm run dev
   ```

4. **Open your browser:**
   Navigate to `http://localhost:3000`

## Manual Setup

If you prefer to set up manually:

### Backend (AWS CDK)

1. Install dependencies:
   ```bash
   npm install
   ```

2. Bootstrap CDK (first time only):
   ```bash
   cdk bootstrap
   ```

3. Deploy infrastructure:
   ```bash
   cdk deploy
   ```

### Frontend (React)

1. Navigate to frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start development server:
   ```bash
   npm start
   ```

## Configuration

After deployment, update the S3 bucket URL in the frontend:

1. Copy the bucket URL from the CDK output
2. Set the environment variable `REACT_APP_S3_BUCKET_URL` or update the default in `App.js`

## Usage

1. **Authentication:** Paste your authentication cookies in the format:
   ```
   ai_user=VALUE; ASP.NET_SessionId=VALUE; AUTHTOKEN=VALUE
   ```

2. **Select Learner:** Choose a learner from the dropdown menu

3. **Fetch Data:** Click "Fetch Components" to load learning components

4. **View Results:** The table will display:
   - Component names
   - Due dates
   - Status (Completed, Pending, etc.)
   - Overdue indicators
   - Associated documents

## Project Structure

```
learner-dashboard/
├── bin/                    # CDK app entry point
├── lib/                    # CDK stack definitions
├── data/                   # Learner data (CSV files)
├── frontend/               # React application
│   ├── src/
│   │   ├── App.js         # Main application component
│   │   ├── index.js       # React entry point
│   │   └── index.css      # Styles
│   └── public/            # Static assets
├── setup.sh               # Automated setup script
├── package.json           # CDK dependencies
└── README.md
```

## Adding New Learners

To add new learners:

1. Edit `data/learners.csv`
2. Add new rows in the format: `learner_name,learner_id`
3. Redeploy: `cdk deploy`

## Troubleshooting

### CORS Issues
If you encounter CORS errors, ensure your S3 bucket allows cross-origin requests. The CDK stack automatically configures this.

### Authentication Errors
Make sure your authentication cookies are fresh and properly formatted. The cookies should include:
- `ai_user`
- `ASP.NET_SessionId`
- `AUTHTOKEN`

### AWS Permissions
Ensure your AWS credentials have permissions for:
- S3 bucket creation and management
- CloudFormation stack operations

## Development

### Adding New Features

1. **Backend changes:** Modify files in `lib/` directory
2. **Frontend changes:** Modify files in `frontend/src/` directory
3. **Data changes:** Update files in `data/` directory

### Deployment

- **Backend only:** `cdk deploy`
- **Frontend only:** `cd frontend && npm run build`
- **Full deployment:** Run `./setup.sh`

## Cleanup

To remove all AWS resources:

```bash
cdk destroy
```

## License

This project is licensed under the MIT License.

## Support

For issues or questions, please create an issue in the GitHub repository.