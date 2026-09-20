import React from 'react';
import { useApplications } from '../contexts/ApplicationsContext';
import { Link } from 'react-router-dom';
import { 
  FileText, CheckCircle2, Clock, AlertCircle, UploadCloud, Eye, ExternalLink, ShieldCheck, CheckSquare, ArrowUpRight
} from 'lucide-react';

export default function Applications() {
  const { applications, updateDocumentStatus, toggleFormFilled } = useApplications();

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 animate-fade-in">
      
      {/* Page Header */}
      <div>
        <div className="flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-brand-600 mb-1">
          <ShieldCheck className="w-4 h-4" />
          <span>Official Portal Preparation Tracker</span>
        </div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Application Process</h1>
        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1 max-w-3xl">
          We prepare your document checklist and guide you to official government portals. Follow the 3 checkpoints below to complete your submission.
        </p>
      </div>

      {applications.length === 0 ? (
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-12 text-center shadow-sm">
          <FileText className="w-12 h-12 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
          <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-2">No Active Applications</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-6 max-w-md mx-auto">
            You haven't started preparing any scholarship applications yet. Find a scholarship and click "Start Preparation" to track it here.
          </p>
          <Link to="/search" className="inline-block px-6 py-2.5 bg-brand-600 hover:bg-brand-700 text-white font-bold text-sm rounded-xl transition-colors shadow-sm">
            Explore Scholarships
          </Link>
        </div>
      ) : (
        <div className="space-y-8">
          {applications.map(app => {
            const readyDocsCount = app.documents.filter(d => d.status === 'Ready').length;
            const totalDocsCount = app.documents.length;
            const step1Complete = readyDocsCount === totalDocsCount;
            const step2Complete = !!app.formFilledOnOfficialSite;
            const step3Complete = step2Complete;

            return (
              <div key={app.id} className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-sm overflow-hidden transition-colors">
                
                {/* Application Top Bar */}
                <div className="p-6 border-b border-gray-200 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-800/50 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <div>
                    <span className="text-xs font-bold text-brand-600 dark:text-brand-400">{app.id}</span>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                      <Link to={`/scholarship/${app.scholarshipId}`} className="hover:text-brand-600 transition-colors">
                        {app.scholarshipName}
                      </Link>
                    </h3>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">Provider: {app.scholarshipProvider}</p>
                  </div>

                  <div className="flex items-center space-x-3">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold border ${
                      step3Complete 
                        ? 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-300 dark:border-emerald-800' 
                        : 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/40 dark:text-amber-300 dark:border-amber-800'
                    }`}>
                      {step3Complete ? '✅ Application Submitted' : '⏳ In Preparation'}
                    </span>
                    <div className="text-xs text-gray-500 dark:text-gray-400 font-semibold">
                      Deadline: <span className="text-gray-800 dark:text-gray-200">{app.deadline}</span>
                    </div>
                  </div>
                </div>

                {/* Main Content: Left Checkpoints Timeline | Right Document List */}
                <div className="p-6 grid grid-cols-1 lg:grid-cols-12 gap-8">
                  
                  {/* Left Column: 3 Checkpoints (7 cols) */}
                  <div className="lg:col-span-7 space-y-6">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400 dark:text-gray-500">
                      Application Process (3 Checkpoints)
                    </h4>

                    <div className="space-y-6 relative border-l-2 border-gray-200 dark:border-gray-700 ml-3 pl-6">
                      
                      {/* Checkpoint 1: Prepare & Upload Documents */}
                      <div className="relative">
                        <div className={`absolute -left-[31px] top-0 w-6 h-6 rounded-full flex items-center justify-center font-bold text-xs ${
                          step1Complete 
                            ? 'bg-emerald-500 text-white' 
                            : 'bg-amber-500 text-white'
                        }`}>
                          {step1Complete ? '✓' : '1'}
                        </div>

                        <div>
                          <div className="flex items-center justify-between">
                            <h5 className="text-base font-bold text-gray-900 dark:text-white">
                              Checkpoint 1: Prepare &amp; Upload Documents
                            </h5>
                            <span className={`text-xs font-bold px-2 py-0.5 rounded ${
                              step1Complete 
                                ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300' 
                                : 'bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300'
                            }`}>
                              {readyDocsCount}/{totalDocsCount} Ready
                            </span>
                          </div>
                          <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                            Prepare and mark all required documents on the Document List panel.
                          </p>

                          {!step1Complete && (
                            <button
                              onClick={() => {
                                app.documents.forEach(d => updateDocumentStatus(app.id, d.name, 'Ready'));
                              }}
                              className="mt-3 text-xs font-bold text-brand-600 hover:text-brand-700 dark:text-brand-400 underline cursor-pointer"
                            >
                              Mark All Documents Ready
                            </button>
                          )}
                        </div>
                      </div>

                      {/* Checkpoint 2: Visit Official Website & Fill Form */}
                      <div className="relative">
                        <div className={`absolute -left-[31px] top-0 w-6 h-6 rounded-full flex items-center justify-center font-bold text-xs ${
                          step2Complete 
                            ? 'bg-emerald-500 text-white' 
                            : step1Complete 
                              ? 'bg-brand-600 text-white' 
                              : 'bg-gray-300 text-gray-600 dark:bg-gray-700 dark:text-gray-400'
                        }`}>
                          {step2Complete ? '✓' : '2'}
                        </div>

                        <div>
                          <h5 className="text-base font-bold text-gray-900 dark:text-white">
                            Checkpoint 2: Visit Official Website &amp; Fill Form
                          </h5>
                          <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                            Click the link below to visit the official portal. Log in, fill out the form, and return here to confirm.
                          </p>

                          {/* Added Official Website Link Box */}
                          <div className="mt-3 p-4 bg-brand-50 dark:bg-brand-950/40 border border-brand-200 dark:border-brand-800 rounded-xl flex items-center justify-between gap-3">
                            <div className="truncate">
                              <span className="text-[10px] uppercase font-bold text-gray-500 dark:text-gray-400 block">Official Portal Link</span>
                              <span className="text-xs font-bold text-brand-700 dark:text-brand-300 truncate block">
                                {app.officialLink}
                              </span>
                            </div>
                            <a
                              href={app.officialLink}
                              target="_blank"
                              rel="noreferrer"
                              className="shrink-0 px-3.5 py-2 bg-brand-600 hover:bg-brand-700 text-white font-bold text-xs rounded-lg flex items-center space-x-1 shadow-sm transition-colors"
                            >
                              <span>Visit Website</span>
                              <ArrowUpRight className="w-3.5 h-3.5" />
                            </a>
                          </div>

                          {/* Form Filled Confirmation Checkbox */}
                          <div className="mt-4 flex items-center space-x-3 bg-gray-50 dark:bg-gray-700/50 p-3 rounded-xl border border-gray-200 dark:border-gray-700">
                            <input
                              type="checkbox"
                              id={`form_check_${app.id}`}
                              checked={step2Complete}
                              onChange={() => toggleFormFilled(app.id)}
                              className="w-5 h-5 text-brand-600 rounded border-gray-300 cursor-pointer focus:ring-brand-500"
                            />
                            <label htmlFor={`form_check_${app.id}`} className="text-xs font-bold text-gray-800 dark:text-gray-200 cursor-pointer select-none">
                              I have visited the official website and filled out the application form
                            </label>
                          </div>
                        </div>
                      </div>

                      {/* Checkpoint 3: Application Submitted */}
                      <div className="relative">
                        <div className={`absolute -left-[31px] top-0 w-6 h-6 rounded-full flex items-center justify-center font-bold text-xs ${
                          step3Complete 
                            ? 'bg-emerald-500 text-white' 
                            : 'bg-gray-300 text-gray-600 dark:bg-gray-700 dark:text-gray-400'
                        }`}>
                          {step3Complete ? '✓' : '3'}
                        </div>

                        <div>
                          <h5 className="text-base font-bold text-gray-900 dark:text-white">
                            Checkpoint 3: Application Submitted
                          </h5>
                          <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                            {step3Complete 
                              ? 'Your application is officially marked as submitted!' 
                              : 'Will be marked complete automatically once Checkpoint 2 form is filled.'}
                          </p>

                          {step3Complete && (
                            <div className="mt-3 p-3 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 rounded-xl flex items-center space-x-2 text-xs text-emerald-700 dark:text-emerald-300 font-bold">
                              <CheckCircle2 className="w-4 h-4 shrink-0" />
                              <span>Application preparation &amp; submission complete! Status logged in tracker.</span>
                            </div>
                          )}
                        </div>
                      </div>

                    </div>
                  </div>

                  {/* Right Column: Document List Side Panel (5 cols) */}
                  <div className="lg:col-span-5 bg-gray-50 dark:bg-gray-900/60 p-5 rounded-xl border border-gray-200 dark:border-gray-700 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-center mb-4 pb-3 border-b border-gray-200 dark:border-gray-700">
                        <h4 className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider">
                          Document List
                        </h4>
                        <span className="text-xs font-semibold text-brand-600 dark:text-brand-400 bg-brand-50 dark:bg-brand-950/50 px-2 py-0.5 rounded">
                          {readyDocsCount}/{totalDocsCount} Uploaded
                        </span>
                      </div>

                      <div className="space-y-2.5">
                        {app.documents.map((doc, idx) => (
                          <div 
                            key={idx} 
                            className="p-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl flex items-center justify-between shadow-2xs"
                          >
                            <div className="flex items-center space-x-2.5 min-w-0 pr-2">
                              {doc.status === 'Ready' ? (
                                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                              ) : (
                                <FileText className="w-4 h-4 text-gray-400 shrink-0" />
                              )}
                              <span className={`text-xs font-semibold truncate ${
                                doc.status === 'Ready' ? 'text-gray-900 dark:text-white' : 'text-gray-600 dark:text-gray-400'
                              }`}>
                                {doc.name}
                              </span>
                            </div>

                            <div className="shrink-0">
                              {doc.status === 'Ready' ? (
                                <button
                                  onClick={() => updateDocumentStatus(app.id, doc.name, 'Required')}
                                  className="text-[10px] font-bold text-red-500 hover:text-red-700 uppercase"
                                >
                                  Remove
                                </button>
                              ) : (
                                <button
                                  onClick={() => updateDocumentStatus(app.id, doc.name, 'Ready')}
                                  className="px-2.5 py-1 bg-brand-600 hover:bg-brand-700 text-white text-[11px] font-bold rounded-lg flex items-center space-x-1 transition-colors"
                                >
                                  <UploadCloud className="w-3 h-3" />
                                  <span>Upload</span>
                                </button>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700 text-center">
                      <p className="text-[11px] text-gray-500 dark:text-gray-400">
                        Uploaded documents are kept in your local Document Wallet for quick verification.
                      </p>
                    </div>
                  </div>

                </div>

              </div>
            );
          })}
        </div>
      )}

    </div>
  );
}
