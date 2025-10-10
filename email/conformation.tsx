import {
    Html,
    Head,
    Body,
    Container,
    Section,
    Text,
    Img,
    Link,
    Font,
    Hr,
} from '@react-email/components';

import { ConformationPayload } from "../src/utils/schemas/conformationPayload.schema";
import { DateTime } from 'luxon'

const containerStyle = {
    maxWidth: '680px',
    margin: '0 auto',
    backgroundColor: '#ffffff',
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
};

const headerStyle = {
    backgroundColor: '#1f2937',
    padding: '32px 24px',
    textAlign: 'center' as const,
};

const cardStyle = {
    backgroundColor: '#ffffff',
    border: '1px solid #e5e7eb',
    borderRadius: '12px',
    padding: '28px',
    margin: '24px 0',
    boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
};

const sectionTitleStyle = {
    fontSize: '18px',
    fontWeight: '700',
    color: '#111827',
    borderBottom: '2px solid #3b82f6',
    paddingBottom: '12px',
    marginBottom: '20px',
    textTransform: 'uppercase' as const,
    letterSpacing: '0.025em',
};

const fieldRowStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    padding: '12px 0',
    borderBottom: '1px solid #f3f4f6',
};

const labelStyle = {
    fontWeight: '600',
    color: '#374151',
    fontSize: '14px',
    width: '35%',
    textTransform: 'capitalize' as const,
};

const valueStyle = {
    color: '#111827',
    fontSize: '14px',
    width: '65%',
    fontWeight: '500',
};

const statusBadgeStyle = (status: string) => ({
    display: 'inline-block',
    padding: '6px 12px',
    borderRadius: '20px',
    fontSize: '12px',
    fontWeight: '600',
    textTransform: 'uppercase' as const,
    backgroundColor: status === 'COMPLETED' ? '#dcfce7' : status === 'PENDING' ? '#fef3c7' : '#fecaca',
    color: status === 'COMPLETED' ? '#166534' : status === 'PENDING' ? '#92400e' : '#dc2626',
});

const documentCardStyle = {
    backgroundColor: '#f8fafc',
    border: '1px solid #e2e8f0',
    borderRadius: '8px',
    padding: '16px',
    marginBottom: '12px',
};

function formatDate(dateString: string | Date) {
    const date = typeof dateString === 'string' ? dateString : dateString.toISOString();
    return DateTime.fromISO(date).setZone('Asia/Kolkata').toFormat('dd MMM yyyy');
}

function formatDateTime(dateString: string | Date) {
    const date = typeof dateString === 'string' ? dateString : dateString.toISOString();
    return DateTime.fromISO(date).setZone('Asia/Kolkata').toFormat('dd MMM yyyy, hh:mm a');
}

function formatDocumentType(type: string) {
    return type.replace(/_/g, ' ').toLowerCase().replace(/\b\w/g, l => l.toUpperCase());
}

// Add these functions after the existing formatDocumentType function

function formatJobPostName(jobPostName: string) {
    const jobPostMap: Record<string, string> = {
        'MTS': 'Multi Tasking Staff',
        'SUPERVISOR': 'Supervisor',
        'CLERK': 'Clerk',
        'ASSISTANT_AGRICULTURE_OFFICER': 'Assistant Agriculture Officer',
        'AGRICULTURE_OFFICER': 'Agriculture Officer',
        'FIELD_OFFICER': 'Field Officer'
    };
    return jobPostMap[jobPostName] || jobPostName;
}

function formatCategory(category: string) {
    const categoryMap: Record<string, string> = {
        'EWS_OR_OBC': 'EWS/OBC',
        'SC_OR_ST': 'SC/ST',
        'GENERAL': 'General'
    };
    return categoryMap[category] || category;
}

function formatGender(gender: string) {
    const genderMap: Record<string, string> = {
        'MALE': 'Male',
        'FEMALE': 'Female',
        'OTHER': 'Other'
    };
    return genderMap[gender] || gender;
}

function formatAddressType(addressType: string) {
    const addressTypeMap: Record<string, string> = {
        'PERMANENT': 'Permanent',
        'CORRESPONDENCE': 'Correspondence'
    };
    return addressTypeMap[addressType] || addressType;
}

function formatExamCenterName(examCenterName: string) {
    const examCenterMap: Record<string, string> = {
        'DELHI_NCR': 'Delhi NCR',
        'LUCKNOW': 'Lucknow',
        'AHMEDABAD': 'Ahmedabad',
        'BHOPAL': 'Bhopal',
        'MUMBAI': 'Mumbai',
        'KOLKATA': 'Kolkata',
        'BHUBANESWAR': 'Bhubaneswar',
        'RANCHI': 'Ranchi',
        'PATNA': 'Patna',
        'BANGALORE': 'Bangalore'
    };
    return examCenterMap[examCenterName] || examCenterName;
}

function formatQualification(qualification: string) {
    const qualificationMap: Record<string, string> = {
        'MATRICULATION': 'Matriculation',
        'INTERMEDIATE_OR_DIPLOMA': 'Intermediate/Diploma',
        'GRADUATION': 'Graduation'
    };
    return qualificationMap[qualification] || qualification;
}

function formatDocumentTypeEnum(documentType: string) {
    const documentTypeMap: Record<string, string> = {
        'PHOTO': 'Photo',
        'SIGNATURE': 'Signature',
        'AADHAAR_FRONT': 'Aadhaar Front',
        'AADHAAR_BACK': 'Aadhaar Back',
        'MATRICULATION_CERTIFICATE': 'Matriculation Certificate',
        'INTERMEDIATE_CERTIFICATE': 'Intermediate Certificate',
        'GRADUATION_CERTIFICATE': 'Graduation Certificate',
        'CATEGORY_CERTIFICATE': 'Category Certificate',
        'DOMICILE_CERTIFICATE': 'Domicile Certificate'
    };
    return documentTypeMap[documentType] || formatDocumentType(documentType);
}

function getChoiceLabel(index: number) {
    const labels = ['First', 'Second', 'Third'];
    return labels[index] || `${index + 1}th`;
}

export function ConfirmationEmail({
    user,
    jobPost,
    category,
    family,
    personalDetail,
    address,
    examinationPreferences,
    education,
    paymentDetails,
    formSubmission,
    documents,
}: ConformationPayload) {
    return (
        <Html>
            <Head>
                <Font
                    fontFamily="Inter"
                    fallbackFontFamily="Arial"
                    webFont={{
                        url: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap',
                        format: 'woff2',
                    }}
                />
            </Head>
            <Body style={{ backgroundColor: '#f3f4f6', fontFamily: 'Inter, Arial, sans-serif', margin: 0, padding: '20px 0' }}>
                <Container style={containerStyle}>
                    {/* Professional Header */}
                    <Section style={headerStyle}>
                        <Text style={{
                            fontSize: '28px',
                            fontWeight: '700',
                            color: '#ffffff',
                            margin: '0 0 8px 0',
                            letterSpacing: '-0.025em',
                        }}>
                            Application Confirmation
                        </Text>
                        <Text style={{
                            fontSize: '16px',
                            color: '#d1d5db',
                            margin: '0',
                            fontWeight: '500',
                        }}>
                            Application ID: {jobPost.applicationNo}
                        </Text>
                        <Text style={{
                            fontSize: '14px',
                            color: '#9ca3af',
                            margin: '8px 0 0 0',
                        }}>
                            Generated on {formatDateTime(new Date())}
                        </Text>
                    </Section>

                    <div style={{ padding: '0 24px' }}>
                        {/* Applicant Information */}
                        <div style={cardStyle}>
                            <div style={sectionTitleStyle}>Applicant Information</div>
                            <div style={fieldRowStyle}>
                                <div style={labelStyle}>Full Name</div>
                                <div style={valueStyle}>{user.name}</div>
                            </div>
                            <div style={fieldRowStyle}>
                                <div style={labelStyle}>Email Address</div>
                                <div style={valueStyle}>{user.email}</div>
                            </div>
                            <div style={fieldRowStyle}>
                                <div style={labelStyle}>Phone Number</div>
                                <div style={valueStyle}>{user.phone}</div>
                            </div>
                            <div style={fieldRowStyle}>
                                <div style={labelStyle}>Aadhaar Number</div>
                                <div style={valueStyle}>{user.aadhaar}</div>
                            </div>
                            <div style={fieldRowStyle}>
                                <div style={labelStyle}>Applied Position</div>
                                <div style={valueStyle}>{formatJobPostName(jobPost.name)}</div>
                            </div>
                            <div style={{ ...fieldRowStyle, borderBottom: 'none' }}>
                                <div style={labelStyle}>Category</div>
                                <div style={valueStyle}>{formatCategory(category.categoryType)}</div>
                            </div>
                        </div>

                        {/* Personal Details */}
                        <div style={cardStyle}>
                            <div style={sectionTitleStyle}>Personal & Family Details</div>
                            <div style={fieldRowStyle}>
                                <div style={labelStyle}>Date of Birth</div>
                                <div style={valueStyle}>{formatDate(personalDetail.dateOfBirth)}</div>
                            </div>
                            <div style={fieldRowStyle}>
                                <div style={labelStyle}>Gender</div>
                                <div style={valueStyle}>{formatGender(personalDetail.gender)}</div>
                            </div>
                            <div style={fieldRowStyle}>
                                <div style={labelStyle}>Nationality</div>
                                <div style={valueStyle}>{personalDetail.nationality}</div>
                            </div>
                            <div style={fieldRowStyle}>
                                <div style={labelStyle}>Father's Name</div>
                                <div style={valueStyle}>{family.fatherName}</div>
                            </div>
                            <div style={{ ...fieldRowStyle, borderBottom: 'none' }}>
                                <div style={labelStyle}>Mother's Name</div>
                                <div style={valueStyle}>{family.motherName}</div>
                            </div>
                        </div>

                        {/* Address Information */}
                        <div style={cardStyle}>
                            <div style={sectionTitleStyle}>Address Information</div>
                            {address.map((addr, index) => (
                                <div key={index} style={{ ...fieldRowStyle, borderBottom: index === address.length - 1 ? 'none' : '1px solid #f3f4f6' }}>
                                    <div style={labelStyle}>{formatAddressType(addr.addressType)}</div>
                                    <div style={valueStyle}>
                                        {addr.addressLine}, {addr.city}<br />
                                        {addr.state} - {addr.pinCode}
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Examination Preferences */}
                        <div style={cardStyle}>
                            <div style={sectionTitleStyle}>Examination Center Preferences</div>
                            {examinationPreferences
                                .sort((a, b) => a.preferenceType.localeCompare(b.preferenceType)) // Sort by preference number if available
                                .map((pref, index) => (
                                    <div key={index} style={{ ...fieldRowStyle, borderBottom: index === examinationPreferences.length - 1 ? 'none' : '1px solid #f3f4f6' }}>
                                        <div style={labelStyle}>
                                            <span style={{ 
                                                display: 'inline-block',
                                                backgroundColor: index === 0 ? '#dbeafe' : index === 1 ? '#fef3c7' : '#fecaca',
                                                color: index === 0 ? '#1d4ed8' : index === 1 ? '#92400e' : '#dc2626',
                                                padding: '4px 8px',
                                                borderRadius: '12px',
                                                fontSize: '12px',
                                                fontWeight: '600',
                                                marginRight: '8px'
                                            }}>
                                                {index + 1}
                                            </span>
                                            {getChoiceLabel(index)} Choice
                                        </div>
                                        <div style={valueStyle}>{formatExamCenterName(pref.examCenterName)}</div>
                                    </div>
                                ))
                            }
                        </div>

                        {/* Educational Qualifications */}
                        <div style={cardStyle}>
                            <div style={sectionTitleStyle}>Educational Qualifications</div>
                            {education.map((edu, index) => (
                                <div key={index} style={{ marginBottom: index === education.length - 1 ? '0' : '24px' }}>
                                    <Text style={{ 
                                        fontSize: '16px',
                                        fontWeight: '600', 
                                        color: '#1f2937',
                                        margin: '0 0 12px 0' 
                                    }}>
                                        {formatQualification(edu.qualification)}
                                    </Text>
                                    <div style={{ backgroundColor: '#f9fafb', padding: '16px', borderRadius: '8px', border: '1px solid #e5e7eb' }}>
                                        <div style={{ ...fieldRowStyle, margin: '0', padding: '8px 0' }}>
                                            <div style={labelStyle}>{edu.qualification ==='MATRICULATION'?"School":edu.qualification==="INTERMEDIATE_OR_DIPLOMA"?"School/College":edu.qualification==="GRADUATION"?"College/University":""}</div>
                                            <div style={valueStyle}>{edu.institution}</div>
                                        </div>
                                        <div style={{ ...fieldRowStyle, margin: '0', padding: '8px 0' }}>
                                            <div style={labelStyle}>{edu.qualification ==='MATRICULATION'?"Board":edu.qualification==="INTERMEDIATE_OR_DIPLOMA"?"Board/University":edu.qualification==="GRADUATION"?"University":""}</div>
                                            <div style={valueStyle}>{edu.boardOrUniversity}</div>
                                        </div>
                                        {edu.subjectOrSpecialization && (
                                            <div style={{ ...fieldRowStyle, margin: '0', padding: '8px 0' }}>
                                                <div style={labelStyle}>{edu.qualification ==='MATRICULATION'?"Subject":edu.qualification==="INTERMEDIATE_OR_DIPLOMA"?"Stream":edu.qualification==="GRADUATION"?"Specialization":""}</div>
                                                <div style={valueStyle}>{edu.subjectOrSpecialization}</div>
                                            </div>
                                        )}
                                        <div style={{ ...fieldRowStyle, margin: '0', padding: '8px 0' }}>
                                            <div style={labelStyle}>Marks Obtained</div>
                                            <div style={valueStyle}>
                                                {edu.marks}{edu.marksType === 'PERCENTAGE' ? '%' : ' CGPA'}
                                            </div>
                                        </div>
                                        <div style={{ ...fieldRowStyle, margin: '0', padding: '8px 0', borderBottom: 'none' }}>
                                            <div style={labelStyle}>Year of Passing</div>
                                            <div style={valueStyle}>{edu.yearOfPassing}</div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Payment Information */}
                        <div style={cardStyle}>
                            <div style={sectionTitleStyle}>Payment Information</div>
                            <div style={fieldRowStyle}>
                                <div style={labelStyle}>Transaction ID</div>
                                <div style={valueStyle}>{paymentDetails.paymentId}</div>
                            </div>
                            <div style={fieldRowStyle}>
                                <div style={labelStyle}>Order ID</div>
                                <div style={valueStyle}>{paymentDetails.orderId}</div>
                            </div>
                            <div style={fieldRowStyle}>
                                <div style={labelStyle}>Amount Paid</div>
                                <div style={valueStyle}>₹{paymentDetails.amount.toLocaleString('en-IN')}</div>
                            </div>
                            <div style={fieldRowStyle}>
                                <div style={labelStyle}>Payment Status</div>
                                <div style={valueStyle}>
                                    <span style={statusBadgeStyle(paymentDetails.paymentStatus)}>
                                        {paymentDetails.paymentStatus}
                                    </span>
                                </div>
                            </div>
                            <div style={{ ...fieldRowStyle, borderBottom: 'none' }}>
                                <div style={labelStyle}>Transaction Date</div>
                                <div style={valueStyle}>
                                    {formatDateTime(paymentDetails.dateTime || paymentDetails.updatedAt)}
                                </div>
                            </div>
                            
                            {paymentDetails.url && (
                                <>
                                    <Hr style={{ margin: '20px 0', border: 'none', borderTop: '1px solid #e5e7eb' }} />
                                    <Text style={{ fontSize: '14px', fontWeight: '600', color: '#374151', margin: '0 0 12px 0' }}>
                                        Payment Receipt
                                    </Text>
                                    <Link href={paymentDetails.url} target="_blank">
                                        <Img
                                            src={paymentDetails.url}
                                            alt="Payment Receipt"
                                            style={{
                                                maxWidth: '300px',
                                                borderRadius: '8px',
                                                border: '2px solid #e5e7eb',
                                                boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
                                            }}
                                        />
                                    </Link>
                                </>
                            )}
                        </div>

                        {/* Application Status */}
                        <div style={cardStyle}>
                            <div style={sectionTitleStyle}>Application Status</div>
                            <div style={fieldRowStyle}>
                                <div style={labelStyle}>Submission Status</div>
                                <div style={valueStyle}>
                                    <span style={statusBadgeStyle(formSubmission.status ? 'COMPLETED' : 'PENDING')}>
                                        {formSubmission.status ? 'Successfully Submitted' : 'Pending Submission'}
                                    </span>
                                </div>
                            </div>
                            <div style={{ ...fieldRowStyle, borderBottom: 'none' }}>
                                <div style={labelStyle}>Submission Date</div>
                                <div style={valueStyle}>{formatDateTime(formSubmission.submissionDate)}</div>
                            </div>
                        </div>

                        {/* Document Verification */}
                        <div style={cardStyle}>
                            <div style={sectionTitleStyle}>Document Verification</div>
                            <Text style={{ fontSize: '14px', color: '#6b7280', margin: '0 0 20px 0' }}>
                                All uploaded documents are listed below for verification purposes.
                            </Text>
                            {documents.map((doc, index) => (
                                <div key={index} style={documentCardStyle}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                                        <Text style={{ fontSize: '15px', fontWeight: '600', color: '#111827', margin: '0' }}>
                                            {formatDocumentTypeEnum(doc.documentType)}
                                        </Text>
                                        <Text style={{ 
                                            fontSize: '12px', 
                                            color: '#059669', 
                                            backgroundColor: '#d1fae5',
                                            padding: '4px 8px',
                                            borderRadius: '12px',
                                            fontWeight: '600',
                                            margin: '0'
                                        }}>
                                            ✓ UPLOADED
                                        </Text>
                                    </div>
                                    
                                    {['PHOTO', 'SIGNATURE', 'AADHAAR_FRONT', 'AADHAAR_BACK'].includes(doc.documentType) && (
                                        <div style={{ marginBottom: '12px' }}>
                                            <Link href={doc.url} target="_blank">
                                                <Img
                                                    src={doc.url}
                                                    alt={formatDocumentType(doc.documentType)}
                                                    style={{
                                                        maxWidth: '200px',
                                                        maxHeight: '130px',
                                                        borderRadius: '6px',
                                                        border: '1px solid #d1d5db',
                                                        objectFit: 'cover' as const,
                                                    }}
                                                />
                                            </Link>
                                        </div>
                                    )}
                                    
                                    <Link
                                        href={doc.url}
                                        target="_blank"
                                        style={{
                                            display: 'inline-flex',
                                            alignItems: 'center',
                                            color: '#2563eb',
                                            textDecoration: 'none',
                                            fontSize: '14px',
                                            fontWeight: '500',
                                            padding: '8px 12px',
                                            backgroundColor: '#eff6ff',
                                            borderRadius: '6px',
                                            border: '1px solid #dbeafe',
                                        }}
                                    >
                                        📎 View Document
                                    </Link>
                                </div>
                            ))}
                        </div>

                        {/* Footer */}
                        <div style={{ 
                            textAlign: 'center' as const, 
                            padding: '32px 0',
                            borderTop: '1px solid #e5e7eb',
                            marginTop: '32px'
                        }}>
                            <Text style={{ fontSize: '14px', color: '#6b7280', margin: '0 0 8px 0' }}>
                                This is an automated confirmation email. Please keep this for your records.
                            </Text>
                            <Text style={{ fontSize: '12px', color: '#9ca3af', margin: '0' }}>
                                For any queries, please contact our support team.
                            </Text>
                        </div>
                    </div>
                </Container>
            </Body>
        </Html>
    );
}