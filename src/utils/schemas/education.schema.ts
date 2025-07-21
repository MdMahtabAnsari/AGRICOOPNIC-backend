import {z} from 'zod/v4';





export const educationSchema = z.object({
     qualification: z.enum(['MATRICULATION', 'INTERMEDIATE_OR_DIPLOMA', 'GRADUATION'], {
        error: 'Invalid education level'
    }),
    institution: z.string().min(3, 'Institution name is required').max(100, 'Institution name must be less than 100 characters'),
    boardOrUniversity: z.string().min(3, 'Board or University is required').max(100, 'Board or University must be less than 100 characters'),
    subjectOrSpecialization: z.string().min(3, 'Subject or Specialization is required').max(100, 'Subject or Specialization must be less than 100 characters').optional(),
    marksType: z.enum(['PERCENTAGE', 'CGPA'], {
        error: 'Invalid marks type'
    }),
    marks: z.string()
        .min(1, 'Marks is required')
        .max(5, 'Marks must be less than 5 characters')
        .regex(/^\d+(\.\d+)?$/, 'Marks must be a valid number'),
    yearOfPassing: z.string()
        .min(4, 'Year of passing is required')
        .max(4, 'Year of passing must be 4 digits')
        .regex(/^\d{4}$/, 'Year of passing must be a valid year'),
}).refine(
    (data) =>
        !(data.marksType === 'CGPA' && parseFloat(data.marks) > 10) &&
        !(data.marksType === 'PERCENTAGE' && parseFloat(data.marks) > 100),
    {
        message: 'Marks value is invalid', // <-- Use a static string here
        path: ['marks'],
    }
    
).refine(
  (data) =>
    !(data.marksType === 'CGPA' && parseFloat(data.marks) > 10) &&
    !(data.marksType === 'PERCENTAGE' && parseFloat(data.marks) > 100),
  {
    message: 'Marks value is invalid',
    path: ['marks'],
  }
).refine(
  (data) =>
    data.qualification === 'MATRICULATION' ||
    (data.subjectOrSpecialization && data.subjectOrSpecialization.trim().length >= 3),
  {
    message: 'Subject or Specialization is required',
    path: ['subjectOrSpecialization'],
  }
);


export type EducationSchema = z.infer<typeof educationSchema>;