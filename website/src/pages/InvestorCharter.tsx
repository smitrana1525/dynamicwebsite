import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Download, FileText, Shield, AlertCircle, ExternalLink } from 'lucide-react';

const InvestorCharter: React.FC = () => {
  return (
    <div className="min-h-screen bg-white">
      <Header currentPage="investor-charter" />
      
      {/* Hero Section */}
      <div className="pt-40 pb-16 bg-gradient-to-r from-blue-900 via-blue-800 to-orange-600 text-white">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h1 className="text-4xl lg:text-5xl font-bold mb-4">
              Investor Charter - <span className="text-orange-400">Depository</span>
            </h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto mb-8">
              Comprehensive information about depository services and investor rights
            </p>
            {/* Breadcrumbs */}
            <div className="flex justify-center items-center space-x-2 text-sm">
              <span className="text-blue-200">Home</span>
              <span className="text-blue-300">/</span>
              <span className="text-orange-400 font-semibold">Investor Charter</span>
            </div>
          </div>
        </div>
      </div>

      <div className="py-20">
        <div className="container mx-auto px-4">

          {/* Main Content */}
          <div className="max-w-5xl mx-auto">
            <div className="bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden">
              {/* Header */}
              <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-6">
                <div className="flex items-center space-x-3">
                  <Shield className="w-8 h-8" />
                  <div>
                    <h2 className="text-2xl font-bold">Investor Charter - Depository Services</h2>
                    <p className="text-blue-100">Central Depository Services Limited (CDSL)</p>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-8 space-y-8">
                {/* Vision */}
                <section>
                  <h3 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
                    <FileText className="w-6 h-6 mr-2 text-blue-600" />
                    Vision
                  </h3>
                  <div className="bg-blue-50 p-6 rounded-lg">
                    <p className="text-gray-700 leading-relaxed">
                      Towards making Indian Securities Market - Transparent, Efficient, & Investor friendly by providing safe, reliable, transparent and trusted record keeping platform for investors to hold and transfer securities in dematerialized form.
                    </p>
                  </div>
                </section>

                {/* Mission */}
                <section>
                  <h3 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
                    <FileText className="w-6 h-6 mr-2 text-blue-600" />
                    Mission
                  </h3>
                  <div className="bg-blue-50 p-6 rounded-lg">
                    <ul className="text-gray-700 space-y-3 leading-relaxed">
                      <li className="flex items-start">
                        <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                        <span>To hold securities of investors in dematerialised form and facilitate its transfer, while ensuring safekeeping of securities and protecting interest of investors.</span>
                      </li>
                      <li className="flex items-start">
                        <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                        <span>To provide timely and accurate information to investors with regard to their holding and transfer of securities held by them.</span>
                      </li>
                      <li className="flex items-start">
                        <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                        <span>To provide the highest standards of investor education, investor awareness and timely services so as to enhance Investor Protection and create awareness about Investor Rights.</span>
                      </li>
                    </ul>
                  </div>
                </section>

                {/* Details of business transacted by the Depository and Depository Participant (DP) */}
                <section>
                  <h3 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
                    <FileText className="w-6 h-6 mr-2 text-blue-600" />
                    Details of business transacted by the Depository and Depository Participant (DP)
                  </h3>
                  <div className="bg-gray-50 p-6 rounded-lg">
                    <p className="text-gray-700 leading-relaxed">
                      A Depository is an organization which holds securities of investors in electronic form. Depositories provide services to various market participants - Exchanges, Clearing Corporations, Depository Participants (DPs), Issuers and Investors in both primary as well as secondary markets. The depository carries out its activities through its agents which are known as Depository Participants (DP). Details available on the link{' '}
                      <a href="https://www.cdslindia.com/eservices/DP/DPlist" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 underline flex items-center inline">
                        https://www.cdslindia.com/eservices/DP/DPlist
                        <ExternalLink className="w-4 h-4 ml-1" />
                      </a>
                    </p>
                  </div>
                </section>

                {/* Description of services provided by the Depository through Depository Participants (DP) to investors */}
                <section>
                  <h3 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
                    <FileText className="w-6 h-6 mr-2 text-blue-600" />
                    Description of services provided by the Depository through Depository Participants (DP) to investors
                  </h3>
                  
                  {/* Basic Services */}
                  <div className="bg-blue-50 p-6 rounded-lg mb-6">
                    <h4 className="font-semibold text-blue-800 mb-4">(1) Basic Services</h4>
                    <div className="overflow-x-auto">
                      <table className="w-full border-collapse border border-gray-300">
                        <thead>
                          <tr className="bg-blue-100">
                            <th className="border border-gray-300 px-4 py-2 text-left font-semibold">Sr. No.</th>
                            <th className="border border-gray-300 px-4 py-2 text-left font-semibold">Brief about the Activity / Service</th>
                            <th className="border border-gray-300 px-4 py-2 text-left font-semibold">Expected Timelines for processing by the DP after receipt of proper documents</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td className="border border-gray-300 px-4 py-2">1</td>
                            <td className="border border-gray-300 px-4 py-2">Dematerialization of securities</td>
                            <td className="border border-gray-300 px-4 py-2">7 days</td>
                          </tr>
                          <tr className="bg-gray-50">
                            <td className="border border-gray-300 px-4 py-2">2</td>
                            <td className="border border-gray-300 px-4 py-2">Rematerialization of securities</td>
                            <td className="border border-gray-300 px-4 py-2">7 days</td>
                          </tr>
                          <tr>
                            <td className="border border-gray-300 px-4 py-2">3</td>
                            <td className="border border-gray-300 px-4 py-2">Mutual Fund Conversion / Destatementization</td>
                            <td className="border border-gray-300 px-4 py-2">5 days</td>
                          </tr>
                          <tr className="bg-gray-50">
                            <td className="border border-gray-300 px-4 py-2">4</td>
                            <td className="border border-gray-300 px-4 py-2">Re-conversion / Restatementisation of Mutual fund units</td>
                            <td className="border border-gray-300 px-4 py-2">7 days</td>
                          </tr>
                          <tr>
                            <td className="border border-gray-300 px-4 py-2">5</td>
                            <td className="border border-gray-300 px-4 py-2">Transmission of securities</td>
                            <td className="border border-gray-300 px-4 py-2">7 days</td>
                          </tr>
                          <tr className="bg-gray-50">
                            <td className="border border-gray-300 px-4 py-2">6</td>
                            <td className="border border-gray-300 px-4 py-2">Registering pledge request</td>
                            <td className="border border-gray-300 px-4 py-2">15 days</td>
                          </tr>
                          <tr>
                            <td className="border border-gray-300 px-4 py-2">7</td>
                            <td className="border border-gray-300 px-4 py-2">Closure of demat account</td>
                            <td className="border border-gray-300 px-4 py-2">30 days</td>
                          </tr>
                          <tr className="bg-gray-50">
                            <td className="border border-gray-300 px-4 py-2">8</td>
                            <td className="border border-gray-300 px-4 py-2">Settlement Instruction</td>
                            <td className="border border-gray-300 px-4 py-2">
                              For T+1 day settlements, Participants shall accept instructions from the Clients, in physical form up to 4 p.m. (in case of electronic instructions up to 6.00 p.m.) on T day for pay-in of securities. For T+0 day settlements, Participants shall accept EPI instructions from the clients, till 11:00 AM on T day. Note: 'T' refers 'Trade Day'
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {/* Value Added Services */}
                  <div className="bg-green-50 p-6 rounded-lg">
                    <h4 className="font-semibold text-green-800 mb-4">(2) Depositories provide special services like pledge, hypothecation, internet based services etc. in addition to their core services and these include</h4>
                    <div className="overflow-x-auto">
                      <table className="w-full border-collapse border border-gray-300">
                        <thead>
                          <tr className="bg-green-100">
                            <th className="border border-gray-300 px-4 py-2 text-left font-semibold">Sr. No.</th>
                            <th className="border border-gray-300 px-4 py-2 text-left font-semibold">Type of Activity /Service</th>
                            <th className="border border-gray-300 px-4 py-2 text-left font-semibold">Brief about the Activity / Service</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td className="border border-gray-300 px-4 py-2">1</td>
                            <td className="border border-gray-300 px-4 py-2">Value Added Services</td>
                            <td className="border border-gray-300 px-4 py-2">
                              Depositories also provide value added services such as a. Basic Services Demat Account (BSDA) b. Transposition cum dematerialization c. Linkages with Clearing System d. Distribution of cash and non-cash corporate benefits (Bonus, Rights, IPOs etc.), stock lending, demat of NSC / KVP, demat of warehouse receipts etc.
                            </td>
                          </tr>
                          <tr className="bg-gray-50">
                            <td className="border border-gray-300 px-4 py-2">2</td>
                            <td className="border border-gray-300 px-4 py-2">Consolidated Account statement (CAS)</td>
                            <td className="border border-gray-300 px-4 py-2">
                              CAS is issued 10 days from the end of the month (if there were transactions in the previous month) or half yearly (if no transactions).
                            </td>
                          </tr>
                          <tr>
                            <td className="border border-gray-300 px-4 py-2">3</td>
                            <td className="border border-gray-300 px-4 py-2">Digitalization of services provided by the depositories</td>
                            <td className="border border-gray-300 px-4 py-2">
                              Depositories offer below technology solutions and e-facilities to their demat account holders through DPs:
                              <ul className="list-disc list-inside mt-2 space-y-1">
                                <li>a. E-account opening</li>
                                <li>b. Online instructions for execution</li>
                                <li>c. e-DIS / Demat Gateway</li>
                                <li>d. e-CAS facility</li>
                                <li>e. Miscellaneous services</li>
                              </ul>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </section>

                {/* Details of Grievance Redressal Mechanism */}
                <section>
                  <h3 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
                    <FileText className="w-6 h-6 mr-2 text-blue-600" />
                    Details of Grievance Redressal Mechanism
                  </h3>
                  
                  {/* The Process of investor grievance redressal */}
                  <div className="bg-red-50 p-6 rounded-lg mb-6">
                    <h4 className="font-semibold text-red-800 mb-4">(1) The Process of investor grievance redressal:</h4>
                    
                    <div className="space-y-4">
                      <div>
                        <h5 className="font-semibold text-gray-900 mb-2">1 Investor Complaint/ Grievances:</h5>
                        <p className="text-gray-700 mb-3">Investor can lodge complaint/ grievance against the Depository/DP in the following ways:</p>
                        
                        <div className="ml-6 space-y-3">
                          <div>
                            <h6 className="font-semibold text-gray-800 mb-1">a. Electronic mode -</h6>
                            <div className="ml-4 space-y-2">
                              <p className="text-gray-700">
                                <strong>(i) SCORES 2.0</strong> (a web based centralized grievance redressal system of SEBI)
                              </p>
                              <p className="text-gray-700 text-sm">Two Level Review for complaint/grievance against DP: - First review done by Designated Body - Second review done by SEBI</p>
                              <p className="text-gray-700">
                                <strong>(ii)</strong> Respective Depository's web portal dedicated for the filing of compliant
                              </p>
                              <p className="text-gray-700">
                                <strong>(iii)</strong> Emails to designated email IDs of Depository -{' '}
                                <a href="mailto:complaints@cdslindia.com" className="text-blue-600 hover:text-blue-800 underline">
                                  complaints@cdslindia.com
                                </a>
                              </p>
                            </div>
                          </div>
                          <div>
                            <h6 className="font-semibold text-gray-800 mb-1">b. Offline mode:</h6>
                            <p className="text-gray-700 ml-4">Investors can send physical letters to MONEYCARE on our corporate office address. (Query Format)</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Online Dispute Resolution (ODR) platform */}
                  <div className="bg-orange-50 p-6 rounded-lg mb-6">
                    <h4 className="font-semibold text-orange-800 mb-4">Online Dispute Resolution (ODR) platform for online Conciliation and Arbitration</h4>
                    <p className="text-gray-700 leading-relaxed">
                      If the Investor is not satisfied with the resolution provided by DP or other Market Participants, then the Investor has the option to file the complaint/ grievance on SMARTODR platform for its resolution through by online conciliation or arbitration.{' '}
                      <a href="https://smartodr.in/login" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 underline flex items-center inline">
                        SMART ODR - https://smartodr.in/login
                        <ExternalLink className="w-4 h-4 ml-1" />
                      </a>
                    </p>
                  </div>

                  {/* Steps to be followed in ODR */}
                  <div className="bg-blue-50 p-6 rounded-lg">
                    <h4 className="font-semibold text-blue-800 mb-4">Steps to be followed in ODR for Review, Conciliation and Arbitration</h4>
                    <ul className="text-gray-700 space-y-3 leading-relaxed">
                      <li className="flex items-start">
                        <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                        <span>Investor to approach Market Participant for redressal of complaint</span>
                      </li>
                      <li className="flex items-start">
                        <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                        <span>If investor is not satisfied with response of Market Participant, he/she can escalate the complaint on SEBI SCORES portal.</span>
                      </li>
                      <li className="flex items-start">
                        <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                        <span>Alternatively, the investor may also file a complaint on SMARTODR portal for its resolution through online conciliation and arbitration.</span>
                      </li>
                      <li className="flex items-start">
                        <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                        <span>Upon receipt of complaint on SMARTODR portal, the relevant MII will review the matter and endeavour to resolve the matter between the Market Participant and investor within 21 days.</span>
                      </li>
                      <li className="flex items-start">
                        <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                        <span>If the matter could not be amicably resolved, then the Investor may request the MII to refer the matter case for conciliation.</span>
                      </li>
                      <li className="flex items-start">
                        <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                        <span>During the conciliation process, the conciliator will endeavor for amicable settlement of the dispute within 21 days, which may be extended with 10 days by the conciliator.</span>
                      </li>
                      <li className="flex items-start">
                        <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                        <span>If the conciliation is unsuccessful, then the investor may request to refer the matter for arbitration.</span>
                      </li>
                      <li className="flex items-start">
                        <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                        <span>The arbitration process to be concluded by arbitrator(s) within 30 days, which is extendable by 30 days.</span>
                      </li>
                    </ul>
                  </div>
                </section>

                {/* Claim to be filed by Beneficial Owner */}
                <section>
                  <h3 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
                    <FileText className="w-6 h-6 mr-2 text-blue-600" />
                    Claim to be filed by Beneficial Owner:
                  </h3>
                  <div className="bg-yellow-50 p-6 rounded-lg">
                    <p className="text-gray-700 leading-relaxed mb-4">
                      The Beneficial owner who suffered a loss due to the actions of Depository Participant ("DP")/ Central Depository Services (India) Limited ("CDSL") needs to file their claim with DP/ CDSL along with relevant documents including but not limited to:
                    </p>
                    <ul className="text-gray-700 space-y-2 leading-relaxed">
                      <li className="flex items-start">
                        <div className="w-2 h-2 bg-yellow-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                        <span>Statement of claim</span>
                      </li>
                      <li className="flex items-start">
                        <div className="w-2 h-2 bg-yellow-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                        <span>Details of estimated loss (including calculation) and supporting documents</span>
                      </li>
                      <li className="flex items-start">
                        <div className="w-2 h-2 bg-yellow-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                        <span>FIR Copy (in case of alleged fraud and infidelity of employee)</span>
                      </li>
                      <li className="flex items-start">
                        <div className="w-2 h-2 bg-yellow-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                        <span>Declaration stating that same relief has not been sought before any other fora</span>
                      </li>
                    </ul>
                    <p className="text-gray-700 leading-relaxed mt-4">
                      The hard copy of the claim is to be addressed to the CDSL Legal Team at the registered office of the Company and the soft copy is to be submitted to the Email ID -{' '}
                      <a href="mailto:claims@cdslindia.com" className="text-blue-600 hover:text-blue-800 underline">
                        claims@cdslindia.com
                      </a>
                    </p>
                  </div>
                </section>

                {/* Guidance pertaining to special circumstances related to market activities */}
                <section>
                  <h3 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
                    <FileText className="w-6 h-6 mr-2 text-blue-600" />
                    Guidance pertaining to special circumstances related to market activities: Termination of the Depository Participant
                  </h3>
                  <div className="bg-purple-50 p-6 rounded-lg">
                    <div className="overflow-x-auto">
                      <table className="w-full border-collapse border border-gray-300">
                        <thead>
                          <tr className="bg-purple-100">
                            <th className="border border-gray-300 px-4 py-2 text-left font-semibold">Sr. No.</th>
                            <th className="border border-gray-300 px-4 py-2 text-left font-semibold">Type of special circumstances</th>
                            <th className="border border-gray-300 px-4 py-2 text-left font-semibold">Timelines for the Activity/ Service</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td className="border border-gray-300 px-4 py-2">1</td>
                            <td className="border border-gray-300 px-4 py-2">Depositories to terminate the participation in case a participant no longer meets the eligibility criteria and/or any other grounds as mentioned in the bye laws like suspension of trading member by the Stock Exchanges. Participant surrenders the participation by its own wish.</td>
                            <td className="border border-gray-300 px-4 py-2">Client will have a right to transfer all its securities to any other Participant of its choice without any charges for the transfer within 30 days from the date of intimation by way of letter/email.</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </section>

                {/* Dos and Don'ts for Investors */}
                <section>
                  <h3 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
                    <FileText className="w-6 h-6 mr-2 text-blue-600" />
                    Dos and Don'ts for Investors
                  </h3>
                  <div className="bg-green-50 p-6 rounded-lg">
                    <p className="text-gray-700 leading-relaxed">
                      For Do's and Don'ts please refer to the link{' '}
                      <a href="#" className="text-blue-600 hover:text-blue-800 underline">
                        Dos and Don'ts for Investor
                      </a>
                    </p>
                  </div>
                </section>

                {/* Rights of investors */}
                <section>
                  <h3 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
                    <FileText className="w-6 h-6 mr-2 text-blue-600" />
                    Rights of investors
                  </h3>
                  <div className="bg-blue-50 p-6 rounded-lg">
                    <p className="text-gray-700 leading-relaxed">
                      For rights please refer to the link{' '}
                      <a href="#" className="text-blue-600 hover:text-blue-800 underline">
                        Rights of investors
                      </a>
                    </p>
                  </div>
                </section>

                {/* Responsibilities of Investors */}
                <section>
                  <h3 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
                    <FileText className="w-6 h-6 mr-2 text-blue-600" />
                    Responsibilities of Investors
                  </h3>
                  <div className="bg-orange-50 p-6 rounded-lg">
                    <p className="text-gray-700 leading-relaxed">
                      For responsibilities please refer to the link{' '}
                      <a href="#" className="text-blue-600 hover:text-blue-800 underline">
                        Responsibilities of Investors
                      </a>
                    </p>
                  </div>
                </section>

                {/* Code of Conduct for Depositories */}
                <section>
                  <h3 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
                    <FileText className="w-6 h-6 mr-2 text-blue-600" />
                    Code of Conduct for Depositories
                  </h3>
                  <div className="bg-gray-50 p-6 rounded-lg">
                    <p className="text-gray-600 text-sm mb-4">(Part D of Third Schedule of SEBI (D & P) regulations, 2018)</p>
                    <p className="text-gray-700 leading-relaxed">
                      For rights please refer to the link{' '}
                      <a href="#" className="text-blue-600 hover:text-blue-800 underline">
                        Code of Conduct for Depositories
                      </a>
                    </p>
                  </div>
                </section>

                {/* Code of Conduct for Participants */}
                <section>
                  <h3 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
                    <FileText className="w-6 h-6 mr-2 text-blue-600" />
                    Code of Conduct for Participants
                  </h3>
                  <div className="bg-indigo-50 p-6 rounded-lg">
                    <p className="text-gray-700 leading-relaxed">
                      For responsibilities please refer to the link{' '}
                      <a href="#" className="text-blue-600 hover:text-blue-800 underline">
                        Code of Conduct for Participants
                      </a>
                    </p>
                  </div>
                </section>

                {/* Policy on processing of claims from IPF */}
                <section>
                  <h3 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
                    <FileText className="w-6 h-6 mr-2 text-blue-600" />
                    Policy on processing of claims from IPF
                  </h3>
                  <div className="bg-red-50 p-6 rounded-lg">
                    <div className="space-y-3">
                      <a href="#" className="text-blue-600 hover:text-blue-800 underline block">
                        CDSL IPF Policy
                      </a>
                      <a href="#" className="text-blue-600 hover:text-blue-800 underline block">
                        CDSL IPF Policy FAQ
                      </a>
                    </div>
                  </div>
                </section>

                {/* Download Section */}
                <section className="border-t pt-8">
                  <h3 className="text-2xl font-semibold text-gray-900 mb-4">Download Documents</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <a
                      href="#"
                      download="investor-charter-depository.pdf"
                      className="flex items-center p-4 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors duration-300 group"
                    >
                      <Download className="w-6 h-6 text-blue-600 mr-3 group-hover:text-blue-800" />
                      <div>
                        <h4 className="font-semibold text-blue-800">Complete Investor Charter</h4>
                        <p className="text-blue-600 text-sm">PDF Document</p>
                      </div>
                    </a>
                    <a
                      href="#"
                      download="depository-services-guide.pdf"
                      className="flex items-center p-4 bg-green-50 hover:bg-green-100 rounded-lg transition-colors duration-300 group"
                    >
                      <Download className="w-6 h-6 text-green-600 mr-3 group-hover:text-green-800" />
                      <div>
                        <h4 className="font-semibold text-green-800">Services Guide</h4>
                        <p className="text-green-600 text-sm">PDF Document</p>
                      </div>
                    </a>
                  </div>
                </section>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Important Notices Marquee */}
      <section className="py-8 bg-blue-50">
        <div className="container mx-auto px-4">
          <div className="bg-white rounded-lg shadow-sm border border-yellow-200 p-4">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
              <h3 className="text-lg font-bold text-gray-900">Important Notices</h3>
            </div>
            <div className="overflow-hidden">
              <div className="animate-marquee whitespace-nowrap text-sm text-gray-700 leading-relaxed">
                <div className="inline-block mr-8">
                  <div className="mb-4">
                    <strong className="text-red-600">ATTENTION INVESTORS:</strong> Prevent Unauthorized Transactions in your demat account. Update your Mobile Number with Us. Receive alerts on your Registered Mobile for all debit and other important transactions in your demat account directly from CDSL on the same day.... Issued in the interest of investors.
                  </div>
                  <div className="mb-4">
                    <strong className="text-blue-800">KYC:</strong> KYC is one time exercise while dealing in securities markets - once KYC is done through a SEBI registered intermediary (Broker, DP, Mutual Fund etc.), you need not undergo the same process again when you approach another intermediary.
                  </div>
                  <div className="mb-4">
                    <strong className="text-blue-800">IPO:</strong> No need to issue cheques by investors while subscribing to IPO. Just write the bank account number and sign in the application form to authorise your bank to make payment in case of allotment. No worries for refund as the money remains in investors account.
                  </div>
                  <div className="mb-4">
                    <strong className="text-blue-800">IBT Trading:</strong> The Stock Exchange, Mumbai is not in any manner answerable, responsible or liable to any person or persons for any acts of omission or commission, errors, mistakes and/or violation, actual or perceived, by us or our partners, agents, associates etc., of any of the Rules, Regulations, Bye-laws of the Stock Exchange, Mumbai, SEBI Act or any other laws in force from time to time.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Additional Information */}
      <section className="py-6 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="space-y-4">
              <p className="text-gray-800">
                <strong>Note:</strong> This is to inform you that we do Client based trading as well as Pro-account trading.
              </p>
              <div>
                <p className="text-gray-800 mb-2">
                  <strong>Procedure to file a complaint on SEBI SCORES:</strong> Register on SCORES portal. Mandatory details for filing complaints on SCORES: Name, PAN, Address, Mobile Number, E-mail ID. Benefits: Effective Communication, Speedy redressal of the grievances.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default InvestorCharter;