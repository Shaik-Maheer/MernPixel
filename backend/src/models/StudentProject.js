import mongoose from 'mongoose'

const schema = new mongoose.Schema(
  {
    studentName: { type: String, required: true, trim: true },
    college: { type: String, required: true, trim: true },
    projectTitle: { type: String, required: true, trim: true },
    problemStatement: { type: String, trim: true, default: '' },
    solutionDescription: { type: String, trim: true, default: '' },
    techStack: [{ type: String, trim: true }],
    keyLearnings: { type: String, trim: true, default: '' },
    screenshots: [{ type: String, trim: true }],
    documentationUrl: { type: String, trim: true, default: '' },
    pptUrl: { type: String, trim: true, default: '' },
    codeZipUrl: { type: String, trim: true, default: '' },
    videoUrl: { type: String, trim: true, default: '' },
    githubLink: { type: String, trim: true, default: '' },
    liveLink: { type: String, trim: true, default: '' },
    active: { type: Boolean, default: true },
  },
  { timestamps: true }
)

export default mongoose.model('StudentProject', schema)
