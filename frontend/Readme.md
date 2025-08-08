# AgriQCert - Agricultural Quality Certification Portal

A modern, beautiful web application for digitizing and securing agricultural export/import certification processes. The portal enables farmers to upload products, QA agencies to conduct quality inspections, and importers/customs to verify credentials using QR codes.

## 🌟 Features

### 🏠 Home Portal
- Beautiful landing page with smooth animations
- Feature overview and statistics
- Call-to-action buttons for different user types

### 👨‍🌾 Farmer Portal
- **Product Upload**: Upload agricultural products with detailed information
- **Status Tracking**: Monitor products through three states: Uploaded → Verified → Purchased
- **Product Management**: View, edit, and manage all uploaded products
- **Quality Certificates**: View quality ratings assigned by QA agencies

### 🛡️ QA Portal
- **Product Review**: Browse all uploaded products awaiting quality assessment
- **Quality Assessment**: Rate products as Excellent, Good, Medium, or Poor
- **Certification**: Issue digitally signed verifiable credentials
- **Product Management**: Filter and search through products by status

### 🛒 Buyer Portal
- **Product Browsing**: Browse verified products with quality ratings
- **Quality Filtering**: Filter products by quality level
- **QR Code Access**: View QR codes for each product
- **Purchase Interface**: Add products to cart and view details

### 📱 QR Scanner
- **QR Code Scanning**: Scan product QR codes for instant verification
- **Product Verification**: View detailed product information and certification
- **Scan History**: Track recent scans and verification results
- **Certificate Details**: Access certification information and download certificates

## 🎨 Design Features

- **Modern UI/UX**: Clean, professional design with smooth transitions
- **Responsive Design**: Fully responsive across all devices
- **Beautiful Animations**: Framer Motion animations for enhanced user experience
- **Color Palette**: Professional color scheme with proper contrast
- **Typography**: Inter font family for excellent readability
- **Glass Morphism**: Modern glassmorphism effects and shadows

## 🚀 Technology Stack

- **React 18**: Modern React with hooks and functional components
- **Framer Motion**: Smooth animations and transitions
- **Lucide React**: Beautiful, customizable icons
- **CSS3**: Modern CSS with custom properties and Grid/Flexbox
- **Responsive Design**: Mobile-first approach

## 🎯 Current Status

The application is now fully functional with:
- ✅ **Farmer Portal** (default) - Upload products, view past products, track status
- ✅ **QA Portal** - Review products, set quality ratings, approve certifications  
- ✅ **Buyer Portal** - Browse products, scan QR codes, verify quality
- ✅ **Responsive Design** - Works on desktop, tablet, and mobile
- ✅ **Modern UI** - Clean design with smooth animations and transitions
- ✅ **Proper CSS** - All styling issues resolved, consistent design system

### 🎮 How to Test Different Portals

To test different portals, edit `src/App.js` and change the `currentPortal` variable:

```javascript
// For Farmer Portal (default)
const currentPortal = 'farmer';

// For QA Portal  
const currentPortal = 'qa';

// For Buyer Portal
const currentPortal = 'buyer';
```

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd agriqcert-portal
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000`

## 🏗️ Project Structure

```
src/
├── portals/
│   ├── farmer/
│   │   ├── FarmerPortal.js      # Farmer portal component
│   │   ├── FarmerPortal.css     # Farmer portal styles
│   │   ├── FarmerNavbar.js      # Farmer navigation
│   │   └── FarmerNavbar.css     # Farmer navigation styles
│   ├── qa/
│   │   ├── QAPortal.js          # QA portal component
│   │   ├── QAPortal.css         # QA portal styles
│   │   ├── QANavbar.js          # QA navigation
│   │   └── QANavbar.css         # QA navigation styles
│   └── buyer/
│       ├── BuyerPortal.js       # Buyer portal component
│       ├── BuyerPortal.css      # Buyer portal styles
│       ├── BuyerNavbar.js       # Buyer navigation
│       ├── BuyerNavbar.css      # Buyer navigation styles
│       ├── QRScanner.js         # QR scanner component
│       └── QRScanner.css        # QR scanner styles
├── pages/
│   ├── Home.js                  # Landing page (legacy)
│   └── Home.css                 # Landing page styles (legacy)
├── components/
│   ├── Navbar.js                # Global navigation (legacy)
│   └── Navbar.css               # Global navigation styles (legacy)
├── App.js                       # Main app component
├── App.css                      # App styles
├── index.js                     # Entry point
└── index.css                    # Global styles
```

## 🎯 User Workflows

### Farmer Workflow
1. Navigate to Farmer Portal
2. Upload product details (name, type, quantity, location, price, description)
3. Track product status: Uploaded → Verified → Purchased
4. View quality ratings and certificates

### QA Agency Workflow
1. Navigate to QA Portal
2. Browse pending products for review
3. Conduct quality assessment and assign ratings
4. Issue digital certificates
5. Manage verified and rejected products

### Buyer/Importer Workflow
1. Navigate to Buyer Portal
2. Browse verified products with quality ratings
3. Filter by quality level (Excellent, Good, Medium)
4. View product details and QR codes
5. Add products to cart

### QR Verification Workflow
1. Navigate to QR Scanner
2. Scan product QR codes
3. View instant verification results
4. Access certification details
5. Download certificates

## 🎨 Color Palette

The application uses a carefully designed color palette:

- **Primary**: Blue tones (#0ea5e9 to #0c4a6e)
- **Success**: Green tones (#22c55e to #14532d)
- **Warning**: Orange tones (#f59e0b to #78350f)
- **Error**: Red tones (#ef4444 to #7f1d1d)
- **Gray**: Neutral tones (#f9fafb to #111827)

## 📱 Responsive Design

The application is fully responsive with breakpoints:
- **Desktop**: 1024px and above
- **Tablet**: 768px to 1023px
- **Mobile**: 480px to 767px
- **Small Mobile**: Below 480px

## 🔧 Available Scripts

- `npm start`: Runs the app in development mode
- `npm build`: Builds the app for production
- `npm test`: Launches the test runner
- `npm eject`: Ejects from Create React App

## 🌐 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 📄 License

This project is licensed under the MIT License.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📞 Support

For support and questions, please open an issue in the repository.

---

**AgriQCert** - Digitizing agricultural quality certification for a secure and transparent future. 