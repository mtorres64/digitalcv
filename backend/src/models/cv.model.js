const mongoose = require('mongoose');

const skillCategorySchema = new mongoose.Schema({
  category: { type: String, required: true },
  items: [{ type: String }],
});

const experienceSchema = new mongoose.Schema({
  role: { type: String, required: true },
  company: { type: String, required: true },
  period: { type: String, required: true },
  client: { type: String },
  industry: { type: String },
  location: { type: String },
  responsibilities: [{ type: String }],
  technologies: [{ type: String }],
});

const projectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  technologies: [{ type: String }],
  icon: { type: String },
  color: { type: String },
});

const educationSchema = new mongoose.Schema({
  degree: { type: String, required: true },
  institution: { type: String },
  period: { type: String },
  type: { type: String, enum: ['degree', 'certification', 'course'], default: 'degree' },
});

const contactSchema = new mongoose.Schema({
  email: { type: String },
  location: { type: String },
  linkedin: { type: String },
  github: { type: String },
});

const cvSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    title: { type: String, required: true },
    subtitle: { type: String },
    profile: { type: String, required: true },
    contact: contactSchema,
    skills: [skillCategorySchema],
    experience: [experienceSchema],
    projects: [projectSchema],
    education: [educationSchema],
    stats: {
      yearsExperience: { type: Number, default: 8 },
      projects: { type: Number, default: 20 },
      technologies: { type: Number, default: 15 },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('CV', cvSchema);
