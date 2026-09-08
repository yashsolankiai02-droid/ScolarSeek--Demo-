const mongoose = require('mongoose');

const scholarshipSchema = new mongoose.Schema(
  {
    // ==========================================
    // UNIVERSAL FIELDS (Every Scholarship)
    // ==========================================
    name: {
      type: String,
      required: [true, 'Scholarship name is required'],
      trim: true,
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
    },
    eligibility: {
      type: String,
      required: [true, 'Eligibility text is required'],
    },
    sector: {
      type: String,
      required: [true, 'Sector is required'],
      enum: [
        'Educational',
        'Sports',
        'Arts & Culture',
        'Healthcare',
        'Business & Entrepreneurship',
        'Research & Innovation',
        'Agricultural',
        'Social Sector',
      ],
    },
    state: {
      type: String,
      required: [true, 'State is required'],
      default: 'All States',
    },
    category: {
      type: [String],
      required: [true, 'Category array is required'],
      default: ['General', 'OBC', 'SC', 'ST', 'EWS'],
    },
    maxIncomeLimit: {
      type: Number,
      required: [true, 'Max income limit is required'],
      default: 10000000, // Large default if no limit
    },
    annualAmount: {
      type: Number,
      required: [true, 'Annual amount is required'],
    },
    deadline: {
      type: String,
      required: [true, 'Deadline is required'],
    },
    officialLink: {
      type: String,
      required: [true, 'Official application link is required'],
    },

    // ==========================================
    // SECTOR-SPECIFIC FIELDS (Conditional)
    // ==========================================

    // 1. EDUCATIONAL
    grade: {
      type: String, // e.g., '12th', 'Bachelor', 'Masters', 'PhD', 'Any Grade'
    },
    fieldOfStudy: {
      type: String, // e.g., 'Science', 'Commerce', 'Arts', 'Engineering', 'Medical', 'Law', 'Management', 'Any Field'
    },
    minCGPA: {
      type: Number, // Percentage requirement (e.g., 60 for 60%+)
      default: 0,
    },

    // 2. SPORTS
    sportType: {
      type: String, // e.g., 'Cricket', 'Football', 'Basketball', 'Hockey', 'Badminton', 'Tennis', 'Athletics', 'Swimming', 'Any Sport'
    },
    performanceLevel: {
      type: String, // e.g., 'School Level', 'State Level', 'National Level', 'International Level', 'Any Level'
    },
    minAge: {
      type: Number,
      default: 0,
    },
    maxAge: {
      type: Number,
      default: 100,
    },
    ageGroup: {
      type: String, // e.g., '10-14', '14-18', '18-25', '25-35', 'Any Age'
    },

    // 3. ARTS & CULTURE
    artDiscipline: {
      type: String, // e.g., 'Classical Music', 'Contemporary Dance', 'Bharatanatyam', 'Theatre', 'Painting', 'Photography', 'Film', 'Any Art'
    },
    proficiencyLevel: {
      type: String, // e.g., 'Beginner', 'Intermediate', 'Advanced', 'Professional', 'Any Level'
    },
    minYearsOfPractice: {
      type: Number,
      default: 0,
    },

    // 4. HEALTHCARE
    medicalField: {
      type: String, // e.g., 'MBBS', 'BDS', 'Nursing', 'Pharmacy', 'Ayurveda', 'Homoeopathy', 'Physiotherapy', 'Any Field'
    },
    qualificationLevel: {
      type: String, // e.g., 'Undergraduate', 'Postgraduate', 'PhD', 'Any Level'
    },
    minNEETScore: {
      type: Number,
      default: 0,
    },

    // 5. BUSINESS & ENTREPRENEURSHIP
    businessStage: {
      type: String, // e.g., 'Idea', 'Startup', 'Growth', 'Scale', 'Any Stage'
    },
    businessType: {
      type: [String], // e.g., ['Technology', 'Agriculture', 'Healthcare']
    },
    fundingAmount: {
      type: Number,
      default: 0,
    },

    // 6. RESEARCH & INNOVATION
    researchField: {
      type: String, // e.g., 'AI', 'Biotechnology', 'Clean Energy', 'Medical Research', 'Space Tech', 'Quantum', 'Nano', 'Agriculture Tech', 'Any Field'
    },
    researchLevel: {
      type: String, // e.g., "Master's Research", 'PhD', 'Postdoctoral', 'Any Level'
    },
    durationMonths: {
      type: Number,
      default: 0,
    },

    // 7. AGRICULTURAL
    agriField: {
      type: String, // e.g., 'Crop Cultivation', 'Horticulture', 'Animal Husbandry', 'Dairy', 'Fisheries', 'Forestry', 'Irrigation', 'Organic', 'Any Field'
    },
    agriQualification: {
      type: String, // e.g., '10th/12th', 'Diploma', 'Bachelor', "Master's", 'PhD', 'Any Level'
    },
    farmType: {
      type: [String], // e.g., ['Small (<5 acres)', 'Medium (5-20)', 'Large (>20)', 'Urban Farm', 'Greenhouse', 'Any Type']
    },

    // 8. SOCIAL SECTOR
    causeArea: {
      type: String, // e.g., 'Education', 'Healthcare', 'Environment', 'Gender Equality', 'Disability', 'Child Welfare', 'Poverty', 'Rural Dev', 'LGBTQ+', 'Any Cause'
    },
    backgroundRequired: {
      type: String, // e.g., 'Social Work degree', 'Development experience', 'Any relevant experience', 'Fresh graduate', 'Any Background'
    },
    roleType: {
      type: String, // e.g., 'Leadership', 'Implementation/Field work', 'Research', 'Training', 'Any Role'
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Scholarship', scholarshipSchema);
