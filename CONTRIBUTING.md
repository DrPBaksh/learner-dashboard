# Contributing to Learner Dashboard

Thank you for your interest in contributing to the Learner Dashboard project!

## Development Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/DrPBaksh/learner-dashboard.git
   cd learner-dashboard
   ```

2. **Install dependencies:**
   ```bash
   npm install
   cd frontend && npm install
   ```

3. **Set up AWS credentials:**
   ```bash
   aws configure
   ```

4. **Deploy the infrastructure:**
   ```bash
   cdk deploy
   ```

## Project Structure

- `bin/` - CDK application entry point
- `lib/` - CDK stack definitions
- `data/` - CSV data files for learners
- `frontend/` - React application
  - `src/components/` - React components
  - `src/utils/` - Utility functions
  - `src/hooks/` - Custom React hooks
  - `src/config/` - Configuration files
- `scripts/` - Utility scripts

## Development Guidelines

### Code Style

- Use consistent indentation (2 spaces)
- Follow React best practices
- Use meaningful variable and function names
- Add comments for complex logic

### Component Structure

- Keep components small and focused
- Use functional components with hooks
- Separate business logic into custom hooks
- Use PropTypes for type checking (if applicable)

### API Integration

- All API calls should go through the `apiService.js` utility
- Handle errors gracefully
- Show loading states for better UX

### CSS

- Use CSS classes instead of inline styles
- Follow BEM naming convention where applicable
- Ensure responsive design for mobile devices

## Making Changes

1. **Create a feature branch:**
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make your changes:**
   - Write clean, well-documented code
   - Test your changes locally
   - Ensure the app builds without errors

3. **Test your changes:**
   ```bash
   # Backend
   npm run build
   cdk diff
   
   # Frontend
   cd frontend
   npm start
   ```

4. **Commit your changes:**
   ```bash
   git add .
   git commit -m "feat: add new feature description"
   ```

5. **Push and create a pull request:**
   ```bash
   git push origin feature/your-feature-name
   ```

## Adding New Features

### Adding New Components

1. Create component file in `frontend/src/components/`
2. Export the component as default
3. Add necessary PropTypes
4. Update parent components to use the new component

### Adding New API Endpoints

1. Add endpoint configuration to `config.js`
2. Create service function in `apiService.js`
3. Add error handling and loading states
4. Update components to use the new service

### Adding New Learner Data

1. Update `data/learners.csv` with new entries
2. Redeploy the CDK stack: `cdk deploy`
3. Test the new data loads correctly

## Testing

- Test all functionality manually
- Ensure responsive design works on different screen sizes
- Verify error handling works correctly
- Test with different authentication scenarios

## Deployment

Before deploying:

1. Test locally
2. Run the build process
3. Check for any console errors
4. Verify all environment variables are set correctly

## Getting Help

If you need help:

1. Check the README.md for setup instructions
2. Look at existing code for patterns and examples
3. Create an issue for bugs or feature requests

## License

By contributing, you agree that your contributions will be licensed under the same license as the project.