import { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import { formAPI } from '../admin/services/api';

export default function StallBooking() {
  // Scroll to top when page is rendered
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Lightbox State
  const [lightboxImage, setLightboxImage] = useState(null);
  const [lightboxTitle, setLightboxTitle] = useState("");

  // Form State
  const [formStatus, setFormStatus] = useState('idle');
  const [formMessage, setFormMessage] = useState('');
  const [formData, setFormData] = useState({
    fullName: "",
    businessCategory: "What is your business category?",
    interestType: "Are you interested in",
    stallSize: "Preferred Stall Size?",
    city: "",
    companyName: "",
    email: "",
    contactNumber: "",
    message: ""
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    
    const { fullName, businessCategory, interestType, stallSize, city, companyName, email, contactNumber, message } = formData;

    if (!fullName || !city || !companyName || !email || !contactNumber) {
      setFormMessage('Please fill all required fields.');
      setFormStatus('error');
      return;
    }

    setFormStatus('submitting');
    setFormMessage('');

    try {
      await formAPI.submitStallBooking({
        fullName,
        businessCategory: businessCategory.includes("category?") ? "Other" : businessCategory,
        interestedIn: interestType.includes("interested in") ? "Booking a Stall" : interestType,
        preferredStallSize: stallSize.includes("Stall Size?") ? "9 Sq. M" : stallSize,
        city,
        companyName,
        email,
        contactNumber,
        message
      });
      setFormStatus('success');
      setFormMessage('Stall booking inquiry submitted! Our team will reach out to you shortly.');
      setFormData({
        fullName: "",
        businessCategory: "What is your business category?",
        interestType: "Are you interested in",
        stallSize: "Preferred Stall Size?",
        city: "",
        companyName: "",
        email: "",
        contactNumber: "",
        message: ""
      });
    } catch (err) {
      console.error('Stall booking submit error:', err);
      setFormStatus('error');
      setFormMessage(err?.response?.data?.message || err?.message || 'Submission failed. Please try again.');
    }
  };

  const openLightbox = (imgSrc, title) => {
    setLightboxImage(imgSrc);
    setLightboxTitle(title);
  };

  const closeLightbox = () => {
    setLightboxImage(null);
    setLightboxTitle("");
  };

  // Stall Sizes Array
  const stallStalls = [
    {
      size: "3M x 3M (9 Sq. Mtr) Stall",
      features: [
        "1 Nos. Table",
        "1 Nos. 5 Amp. Plug Point",
        "1 Dustbin",
        "2 Nos. Moulded Chairs",
        "3 Participant Badges",
        "3 Spot Lights",
        "100 Nos. Invitation Cards",
        "48 Nos. 200ml Bottle Per Day",
        "Name On Fascia (Vinyl)",
        "Carpet Flooring",
        "Laminated Stall"
      ]
    },
    {
      size: "4M x 3M (12 Sq. Mtr) Stall",
      features: [
        "2 Nos. Tables",
        "1 Nos. 5 Amp. Plug Point",
        "1 Dustbin",
        "2 Nos. Moulded Chairs",
        "3 Participant Badges",
        "4 Spot Lights",
        "100 Nos. Invitation Cards",
        "48 Nos. 200ml Bottle Per Day",
        "Name On Fascia (Vinyl)",
        "Carpet Flooring",
        "Laminated Stall"
      ]
    },
    {
      size: "6M x 3M (18 Sq. Mtr) Stall",
      features: [
        "4 Nos. Tables",
        "2 Nos. 5 Amp. Plug Point",
        "1 Dustbin",
        "4 Nos. Moulded Chairs",
        "4 Participant Badges",
        "6 Spot Lights",
        "100 Nos. Invitation Cards",
        "48 Nos. 200ml Bottle Per Day",
        "Name On Fascia (Vinyl)",
        "Carpet Flooring",
        "Laminated Stall"
      ]
    },
    {
      size: "9M x 3M (27 Sq. Mtr) Stall",
      features: [
        "5 Nos. Tables",
        "2 Nos. 5 Amp. Plug Point",
        "1 Dustbin",
        "6 Nos. Moulded Chairs",
        "5 Participant Badges",
        "9 Spot Lights",
        "100 Nos. Invitation Cards",
        "48 Nos. 200ml Bottle Per Day",
        "Name On Fascia (Vinyl)",
        "Carpet Flooring",
        "Laminated Stall"
      ]
    },
    {
      size: "6M x 6M (36 Sq. Mtr) Stall",
      features: [
        "6 Nos. Tables",
        "2 Nos. 5 Amp. Plug Point",
        "1 Dustbin",
        "8 Nos. Moulded Chairs",
        "6 Participant Badges",
        "9 Spot Lights",
        "100 Nos. Invitation Cards",
        "48 Nos. 200ml Bottle Per Day",
        "Name On Fascia (Vinyl)",
        "Carpet Flooring",
        "Laminated Stall"
      ]
    },
    {
      size: "9M x 6M (54 Sq. Mtr) Stall",
      features: [
        "6 Nos. Tables",
        "2 Nos. 5 Amp. Plug Point",
        "1 Dustbin",
        "8 Nos. Moulded Chairs",
        "6 Participant Badges",
        "10 Spot Lights",
        "100 Nos. Invitation Cards",
        "48 Nos. 200ml Bottle Per Day",
        "Name On Fascia (Vinyl)",
        "Carpet Flooring",
        "Laminated Stall"
      ]
    },
    {
      size: "12M x 6M (72 Sq. Mtr) Stall",
      features: [
        "6 Nos. Tables",
        "2 Nos. 5 Amp. Plug Point",
        "1 Dustbin",
        "8 Nos. Moulded Chairs",
        "6 Participant Badges",
        "12 Spot Lights",
        "100 Nos. Invitation Cards",
        "48 Nos. 200ml Bottle Per Day",
        "Name On Fascia (Vinyl)",
        "Carpet Flooring",
        "Laminated Stall"
      ]
    }
  ];

  const participationCharges = [
    {
      title: "Participation Charges Standard Booth",
      bullets: ["INR 8,500 (Per Sq. M.)", "$ 150 (Per Sq. M.)"]
    },
    {
      title: "Participation Charges Bare Space",
      bullets: ["INR 7,500 (Per Sq. M.)", "$ 125 (Per Sq. M.)"]
    },
    {
      title: "Additional Requirement Cost Compressor 3 CFM | 100 Psi",
      bullets: ["INR 12,000 Per Connection", "$ 300 Per Connection"]
    },
    {
      title: "Additional Requirement Cost Compressor 6 CFM | 100 Psi",
      bullets: ["INR 16,000 Per Connection", "$ 400 Per Connection"]
    },
    {
      title: "Additional Requirement Cost Compressor 10 CFM | 100 Psi",
      bullets: ["INR 20,000 Per Connection", "$ 500 Per Connection"]
    },
    {
      title: "Electricity",
      bullets: ["INR 3000 (Per HP)", "$ 80 (Per HP)"]
    },
    {
      title: "Premium Space Cost",
      bullets: ["2 Sides Open 15% Extra", "3 Sides Open 25% Extra & 4 Sides Open 30% Extra"]
    }
  ];

  return (
    <Layout
      pageCss={[{ id: 'page-css-stall_booking', href: '/css/page-stall_booking.css' }]}
      bodyClass="page-template-default page page-id-275 wp-custom-logo elementor-default elementor-kit-23 elementor-page elementor-page-275"
    >
      <div className="stall-booking-page-wrapper elementor-31036" style={{ background: "#fff", fontFamily: "'Outfit', sans-serif" }}>
        
        {/* CSS Helper for Responsive Layout */}
        <style>{`
          @media (max-width: 991px) {
            .pricing-grid, .benefits-grid, .floorplan-grid {
              grid-template-columns: 1fr !important;
              gap: 30px !important;
            }
            .benefits-list-row {
              grid-template-columns: 1fr !important;
            }
            .stall-card {
              width: 100% !important;
            }
          }
          .stall-card {
            transition: all 0.3s ease;
          }
          .floor-plan-card {
            position: relative;
            overflow: hidden;
            border-radius: 8px;
            box-shadow: 0 10px 25px rgba(0,0,0,0.06);
            border: 1px solid #f0f4f8;
            background: #fff;
            transition: all 0.3s ease;
          }
          .floor-plan-card:hover {
            transform: scale(1.02);
            box-shadow: 0 15px 35px rgba(0,0,0,0.12);
          }
          .input-active:focus {
            border-color: #f7c600 !important;
            box-shadow: 0 0 0 3px rgba(247, 198, 0, 0.1) !important;
          }
        `}</style>

        {/* 1. HERO BREADCRUMB BANNER */}
        <div dangerouslySetInnerHTML={{ __html: `
          <div class="header-breadcamb-fixer">
            <div data-elementor-type="wp-post" data-elementor-id="10514" class="elementor elementor-10514">
              <div class="default no-position show_shadow rs-sticky-default elementor-element elementor-element-41335a8 e-flex e-con-boxed e-con e-parent e-lazyloaded" data-id="41335a8" data-element_type="container" data-e-type="container" data-settings="{&quot;background_background&quot;:&quot;classic&quot;}">
                <div class="e-con-inner">
                  <div class="default no-position show_shadow rs-sticky-default elementor-element elementor-element-5e42932 e-flex e-con-boxed e-con e-child" data-id="5e42932" data-element_type="container" data-e-type="container">
                    <div class="e-con-inner">
                      <div class="default no-position show_shadow rs-sticky-default elementor-element elementor-element-5052d52 e-con-full e-flex e-con e-child" data-id="5052d52" data-element_type="container" data-e-type="container">
                        <div class="elementor-element elementor-element-76b8911 elementor-widget elementor-widget-page-title" data-id="76b8911" data-element_type="widget" data-e-type="widget" data-widget_type="page-title.default">
                          <div class="elementor-widget-container">
                            <div class="hfe-page-title hfe-page-title-wrapper elementor-widget-heading">
                              <h1 class="elementor-heading-title elementor-size">Stall Booking</h1>
                            </div>
                          </div>
                        </div>
                        <div class="elementor-element elementor-element-9425f56 elementor-widget elementor-widget-rs-breadcrumb" data-id="9425f56" data-element_type="widget" data-e-type="widget" data-widget_type="rs-breadcrumb.default">
                          <div class="elementor-widget-container">
                            <div class="breadcrumb-area style3">
                              <div class="breadcrumbs-inner">
                                <span property="itemListElement" typeof="ListItem"><a property="item" typeof="WebPage" title="Go to Engitech Expo Ahmedabad." href="/" class="home"><span property="name">Engitech Expo Ahmedabad</span></a><meta property="position" content="1"></span> &gt; <span property="itemListElement" typeof="ListItem"><span property="name" class="post post-page current-item">Stall Booking</span><meta property="url" content="https://engitechexpo.com/stall-booking/"><meta property="position" content="2"></span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ` }} />

        {/* 2. STALL TYPES SECTION */}
        <section style={{ padding: "85px 0", background: "#f8f9fa" }}>
          <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 20px" }}>
            
            <div style={{ marginBottom: "50px" }}>
              <div style={{ display: "inline-flex", alignItems: "center", gap: "10px", marginBottom: "5px" }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 17 12" fill="none">
                  <path d="M10.9091 8.57143L16.3636 12L0 12L5.45454 8.57143L10.9091 8.57143Z" fill="#F7C600"></path>
                </svg>
                <span style={{ color: "#f7c600", fontSize: "12px", fontWeight: 700, textTransform: "uppercase" }}>
                  TYPES &amp; PRICING
                </span>
              </div>
              
              <h2 style={{ fontSize: "32px", fontWeight: 800, color: "#111", margin: "0 0 5px 0" }}>
                Stall Types &amp; Pricing
              </h2>
              
              <span style={{ fontSize: "13px", color: "#555", fontWeight: 600 }}>
                Stall Pricing: 7500 Per Sq. Mtr
              </span>
            </div>

            {/* Grid Layout of Stalls */}
            <div 
              className="pricing-grid"
              style={{ 
                display: "flex", 
                flexWrap: "wrap",
                justifyContent: "center",
                gap: "20px" 
              }}
            >
              {stallStalls.map((stall, idx) => (
                <div 
                  key={idx}
                  className="stall-card"
                  style={{
                    background: "#264b62",
                    width: "calc(33.333% - 15px)",
                    minWidth: "300px",
                    clipPath: "polygon(0 0, calc(100% - 35px) 0, 100% 35px, 100% 100%, 0 100%)",
                    padding: "35px 28px",
                    display: "flex",
                    flexDirection: "column"
                  }}
                >
                  <h3 style={{ fontSize: "16px", fontWeight: 800, color: "#fff", margin: "0 0 12px 0" }}>
                    {stall.size}
                  </h3>

                  <p style={{ fontSize: "13px", color: "#fff", lineHeight: "1.6", margin: 0, fontWeight: 400 }}>
                    {stall.features.join(" , ")} .
                  </p>
                </div>
              ))}
            </div>

          </div>
        </section>

        {/* 3. ADDITIONAL CHARGES SECTION */}
        <section style={{ padding: "85px 0", background: "#f8f9fa" }}>
          <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 20px" }}>
            
            <div 
              className="pricing-grid"
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gap: "10px"
              }}
            >
              {participationCharges.map((charge, idx) => (
                <div 
                  key={idx}
                  style={{
                    background: "#264b62",
                    padding: "20px 25px",
                    display: "flex",
                    flexDirection: "column",
                    gap: "12px"
                  }}
                >
                  <h4 style={{ fontSize: "15px", fontWeight: 700, color: "#fff", margin: 0 }}>
                    {charge.title}
                  </h4>

                  <ul style={{ paddingLeft: "18px", margin: 0, color: "#fff", fontSize: "13px", display: "flex", flexDirection: "column", gap: "6px" }}>
                    {charge.bullets.map((bullet, bIdx) => (
                      <li key={bIdx}>{bullet}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

          </div>
        </section>

        {/* 4. PRE & DURING EXPO BENEFITS */}
        <section style={{ padding: "60px 0", background: "#f8f9fa" }}>
          <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 20px" }}>
            
            {/* Pre Expo Benefits */}
            <div style={{ marginBottom: "50px" }}>
              <div style={{ display: "inline-flex", alignItems: "center", gap: "10px", marginBottom: "10px" }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 17 12" fill="none">
                  <path d="M10.9091 8.57143L16.3636 12L0 12L5.45454 8.57143L10.9091 8.57143Z" fill="#F7C600"></path>
                </svg>
                <span style={{ color: "#f7c600", fontSize: "12px", fontWeight: 700, textTransform: "uppercase" }}>EXPO BENEFITS</span>
              </div>
              <h2 style={{ fontSize: "28px", fontWeight: 800, color: "#111", margin: "0 0 20px 0" }}>Pre - Expo Benefits</h2>
              <ul style={{ paddingLeft: "20px", color: "#666", fontSize: "14px", display: "flex", flexDirection: "column", gap: "10px", margin: 0 }}>
                <li>1.5 Lakh Invitation Card to be distributed in all over India. (150 cards) given to individual participant</li>
                <li>Your LOGO will be printed in our next brochure.</li>
                <li>Whatsapp marketing in filtered data from our database of 8 million so that you will gets interested visitors as well as genuine buyers.</li>
              </ul>
            </div>

            {/* During Expo Benefits */}
            <div>
              <div style={{ display: "inline-flex", alignItems: "center", gap: "10px", marginBottom: "10px" }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 17 12" fill="none">
                  <path d="M10.9091 8.57143L16.3636 12L0 12L5.45454 8.57143L10.9091 8.57143Z" fill="#F7C600"></path>
                </svg>
                <span style={{ color: "#f7c600", fontSize: "12px", fontWeight: 700, textTransform: "uppercase" }}>EXPO BENEFITS</span>
              </div>
              <h2 style={{ fontSize: "28px", fontWeight: 800, color: "#111", margin: "0 0 20px 0" }}>During Exhibition Benefits</h2>
              
              <div className="benefits-list-row" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "30px" }}>
                <ul style={{ paddingLeft: "20px", color: "#666", fontSize: "14px", display: "flex", flexDirection: "column", gap: "10px", margin: 0 }}>
                  <li>Loading and Unloading Facility Will Be Provided Complimentary By Engitech (Hydra &amp; Forklift).</li>
                  <li>Security Will Be Provided 24/7* For 4 Days With CCTV Camera Recording.</li>
                  <li>You Will Receive 48 Nos. 200ml Water Bottle Per Day.</li>
                </ul>
                <ul style={{ paddingLeft: "20px", color: "#666", fontSize: "14px", display: "flex", flexDirection: "column", gap: "10px", margin: 0 }}>
                  <li>On Site H R Service Agency Available For Temporary Staff At Your Stall.</li>
                  <li>On Site H R Service Agency Available For Temporary Staff At Your Stall.</li>
                  <li>Timing Is 10:00 AM To 06:00 PM. <br/>(Last Day Of Exhibition 10:00 AM To 04:00 PM).</li>
                </ul>
              </div>
            </div>

          </div>
        </section>

        {/* 5. FLOOR PLANS */}
        <section style={{ padding: "85px 0", background: "#fff" }}>
          <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 20px" }}>
            
            <div style={{ textAlign: "center", marginBottom: "55px" }}>
              <div style={{ display: "inline-flex", alignItems: "center", gap: "10px", marginBottom: "15px" }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="17" height="12" viewBox="0 0 17 12" fill="none">
                  <path d="M10.9091 8.57143L16.3636 12L0 12L5.45454 8.57143L10.9091 8.57143Z" fill="#F7C600"></path>
                  <path fillRule="evenodd" clipRule="evenodd" d="M10.9091 5.14286L16.3636 8.57143L10.9091 8.57143L8.18182 6.85714L5.45454 8.57143L-1.49868e-07 8.57143L5.45454 5.14286L10.9091 5.14286ZM10.9091 5.14286L8.18182 3.42857L5.45454 5.14286L-2.99735e-07 5.14286L8.18182 -3.57639e-07L16.3636 5.14286L10.9091 5.14286Z" fill="#F7C600"></path>
                </svg>
                <span style={{ color: "#f7c600", fontSize: "14px", fontWeight: 700, letterSpacing: "1.5px", textTransform: "uppercase" }}>
                  Floor Plans
                </span>
              </div>
              
              <h2 style={{ fontSize: "38px", fontWeight: 800, color: "#172d3e", margin: "0 0 10px 0" }}>
                Exhibition Floor Plan Layouts
              </h2>
              <p style={{ fontSize: "15px", color: "#666", maxWidth: "700px", margin: "0 auto" }}>
                Click on any floor plan to view the high-resolution architectural layout and available stall numbers.
              </p>
            </div>

            <div 
              className="floorplan-grid"
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gap: "35px"
              }}
            >
              {/* Ahmedabad */}
              <div className="floor-plan-card" style={{ display: "flex", flexDirection: "column" }}>
                <div style={{ overflow: "hidden", position: "relative", background: "#f8fafc", flexGrow: 1 }}>
                  <img 
                    src="/images/Screenshot-2026-02-02-at-6.58.59-PM.png" 
                    alt="Ahmedabad Exhibition 2026 floor plan" 
                    style={{ width: "100%", height: "auto", display: "block", maxHeight: "380px", objectFit: "contain", cursor: "pointer", padding: "10px" }}
                    onClick={() => openLightbox("/images/Screenshot-2026-02-02-at-6.58.59-PM.png", "AHMEDABAD UPCOMING EXHIBITION - 2026")}
                  />
                </div>
                <div style={{ padding: "20px 24px", borderTop: "1px solid #eef2f6", background: "#fff", textAlign: "center" }}>
                  <h4 style={{ fontSize: "15px", fontWeight: 800, color: "#172d3e", margin: "0 0 6px 0", letterSpacing: "0.5px" }}>
                    AHMEDABAD UPCOMING EXHIBITION-2026
                  </h4>
                  <span style={{ fontSize: "12px", color: "#888", fontWeight: 600 }}>Floor Plan Layout</span>
                </div>
              </div>

              {/* Rajkot */}
              <div className="floor-plan-card" style={{ display: "flex", flexDirection: "column" }}>
                <div style={{ overflow: "hidden", position: "relative", background: "#f8fafc", flexGrow: 1 }}>
                  <img 
                    src="/images/Screenshot-2026-02-02-at-7.04.14-PM.png" 
                    alt="Rajkot Exhibition 2027 floor plan" 
                    style={{ width: "100%", height: "auto", display: "block", maxHeight: "380px", objectFit: "contain", cursor: "pointer", padding: "10px" }}
                    onClick={() => openLightbox("/images/Screenshot-2026-02-02-at-7.04.14-PM.png", "RAJKOT UPCOMING EXHIBITION - 2027")}
                  />
                </div>
                <div style={{ padding: "20px 24px", borderTop: "1px solid #eef2f6", background: "#fff", textAlign: "center" }}>
                  <h4 style={{ fontSize: "15px", fontWeight: 800, color: "#172d3e", margin: "0 0 6px 0", letterSpacing: "0.5px" }}>
                    RAJKOT UPCOMING EXHIBITION-2027
                  </h4>
                  <span style={{ fontSize: "12px", color: "#888", fontWeight: 600 }}>Floor Plan Layout</span>
                </div>
              </div>

              {/* Vadodara */}
              <div className="floor-plan-card" style={{ display: "flex", flexDirection: "column" }}>
                <div style={{ overflow: "hidden", position: "relative", background: "#f8fafc", flexGrow: 1 }}>
                  <img 
                    src="/images/Screenshot-2026-02-02-at-7.18.15-PM.png" 
                    alt="Vadodara Exhibition 2028 floor plan" 
                    style={{ width: "100%", height: "auto", display: "block", maxHeight: "380px", objectFit: "contain", cursor: "pointer", padding: "10px" }}
                    onClick={() => openLightbox("/images/Screenshot-2026-02-02-at-7.18.15-PM.png", "VADODARA UPCOMING EXHIBITION - 2028")}
                  />
                </div>
                <div style={{ padding: "20px 24px", borderTop: "1px solid #eef2f6", background: "#fff", textAlign: "center" }}>
                  <h4 style={{ fontSize: "15px", fontWeight: 800, color: "#172d3e", margin: "0 0 6px 0", letterSpacing: "0.5px" }}>
                    VADODARA UPCOMING EXHIBITION-2028
                  </h4>
                  <span style={{ fontSize: "12px", color: "#888", fontWeight: 600 }}>Floor Plan Layout</span>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* 6. BOOKING FORM SECTION */}
        <section 
          id="stall-form-section"
          style={{
            background: "#f9fbfd",
            padding: "85px 0",
            borderTop: "1px solid #eef2f6",
            borderBottom: "1px solid #eef2f6"
          }}
        >
          <div style={{ maxWidth: "680px", margin: "0 auto", padding: "0 20px" }}>
            
            <div 
              style={{
                background: "#fff",
                borderTop: "5px solid #f7c600",
                borderRadius: "8px",
                padding: "45px 35px",
                boxShadow: "0 15px 40px rgba(0,0,0,0.05)",
                borderLeft: "1px solid #eef2f6",
                borderRight: "1px solid #eef2f6",
                borderBottom: "1px solid #eef2f6"
              }}
            >
              <div style={{ textAlign: "center", marginBottom: "35px" }}>
                <h2 style={{ fontSize: "32px", fontWeight: 800, color: "#172d3e", margin: "0 0 8px 0" }}>
                  Get In Touch
                </h2>
                <span style={{ fontSize: "14px", color: "#888", fontWeight: 500, letterSpacing: "0.5px" }}>
                  Book Your Exhibition Space
                </span>
              </div>

              <form 
                onSubmit={handleFormSubmit}
                style={{ display: "flex", flexDirection: "column", gap: "22px" }}
              >
                <div>
                  <label style={{ display: "block", fontSize: "14px", fontWeight: 700, color: "#172d3e", marginBottom: "8px" }}>
                    Full Name
                  </label>
                  <input 
                    type="text" 
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    required
                    className="input-active"
                    style={{
                      width: "100%",
                      padding: "12px 16px",
                      borderRadius: "4px",
                      border: "1px solid #cbd5e1",
                      background: "#fff",
                      fontSize: "15px",
                      color: "#334155",
                      outline: "none",
                      transition: "all 0.2s"
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: "block", fontSize: "14px", fontWeight: 700, color: "#172d3e", marginBottom: "8px" }}>
                    Business Category
                  </label>
                  <select 
                    name="businessCategory"
                    value={formData.businessCategory}
                    onChange={handleInputChange}
                    className="input-active"
                    style={{
                      width: "100%",
                      padding: "12px 16px",
                      borderRadius: "4px",
                      border: "1px solid #cbd5e1",
                      background: "#fff",
                      fontSize: "15px",
                      color: "#334155",
                      outline: "none",
                      transition: "all 0.2s"
                    }}
                  >
                    <option value="What is your business category?">What is your business category?</option>
                    <option value="Machine Tools">Machine Tools</option>
                    <option value="Automation/Robotics">Automation/Robotics</option>
                    <option value="Packaging Machinery">Packaging Machinery</option>
                    <option value="Power/Electrical Equipment">Power/Electrical Equipment</option>
                    <option value="Material Handling">Material Handling</option>
                    <option value="HVAC/Compressor">HVAC/Compressor</option>
                    <option value="Laser Cutting/Marking Machines">Laser Cutting/Marking Machines</option>
                    <option value="Renewable Energy/ Solar">Renewable Energy/ Solar</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
                  <div>
                    <label style={{ display: "block", fontSize: "14px", fontWeight: 700, color: "#172d3e", marginBottom: "8px" }}>
                      Are you interested in
                    </label>
                    <select 
                      name="interestType"
                      value={formData.interestType}
                      onChange={handleInputChange}
                      className="input-active"
                      style={{
                        width: "100%",
                        padding: "12px 16px",
                        borderRadius: "4px",
                        border: "1px solid #cbd5e1",
                        background: "#fff",
                        fontSize: "15px",
                        color: "#334155",
                        outline: "none",
                        transition: "all 0.2s"
                      }}
                    >
                      <option value="Are you interested in">Are you interested in</option>
                      <option value="Booking a Stall">Booking a Stall</option>
                      <option value="Sponsorship Opportunities">Sponsorship Opportunities</option>
                      <option value="Visiting the Expo">Visiting the Expo</option>
                    </select>
                  </div>

                  <div>
                    <label style={{ display: "block", fontSize: "14px", fontWeight: 700, color: "#172d3e", marginBottom: "8px" }}>
                      Preferred Stall Size?
                    </label>
                    <select 
                      name="stallSize"
                      value={formData.stallSize}
                      onChange={handleInputChange}
                      className="input-active"
                      style={{
                        width: "100%",
                        padding: "12px 16px",
                        borderRadius: "4px",
                        border: "1px solid #cbd5e1",
                        background: "#fff",
                        fontSize: "15px",
                        color: "#334155",
                        outline: "none",
                        transition: "all 0.2s"
                      }}
                    >
                      <option value="Preferred Stall Size?">Preferred Stall Size?</option>
                      <option value="9 Sq. M">9 Sq. M</option>
                      <option value="12 Sq. M">12 Sq. M</option>
                      <option value="18 Sq. M">18 Sq. M</option>
                      <option value="27 Sq. M or larger">27 Sq. M or larger</option>
                    </select>
                  </div>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
                  <div>
                    <label style={{ display: "block", fontSize: "14px", fontWeight: 700, color: "#172d3e", marginBottom: "8px" }}>
                      City
                    </label>
                    <input 
                      type="text" 
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      required
                      className="input-active"
                      style={{
                        width: "100%",
                        padding: "12px 16px",
                        borderRadius: "4px",
                        border: "1px solid #cbd5e1",
                        background: "#fff",
                        fontSize: "15px",
                        color: "#334155",
                        outline: "none",
                        transition: "all 0.2s"
                      }}
                    />
                  </div>

                  <div>
                    <label style={{ display: "block", fontSize: "14px", fontWeight: 700, color: "#172d3e", marginBottom: "8px" }}>
                      Company Name
                    </label>
                    <input 
                      type="text" 
                      name="companyName"
                      value={formData.companyName}
                      onChange={handleInputChange}
                      required
                      className="input-active"
                      style={{
                        width: "100%",
                        padding: "12px 16px",
                        borderRadius: "4px",
                        border: "1px solid #cbd5e1",
                        background: "#fff",
                        fontSize: "15px",
                        color: "#334155",
                        outline: "none",
                        transition: "all 0.2s"
                      }}
                    />
                  </div>
                </div>

                <div>
                  <label style={{ display: "block", fontSize: "14px", fontWeight: 700, color: "#172d3e", marginBottom: "8px" }}>
                    Your email
                  </label>
                  <input 
                    type="email" 
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="input-active"
                    style={{
                      width: "100%",
                      padding: "12px 16px",
                      borderRadius: "4px",
                      border: "1px solid #cbd5e1",
                      background: "#fff",
                      fontSize: "15px",
                      color: "#334155",
                      outline: "none",
                      transition: "all 0.2s"
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: "block", fontSize: "14px", fontWeight: 700, color: "#172d3e", marginBottom: "8px" }}>
                    Contact Number
                  </label>
                  <input 
                    type="text" 
                    name="contactNumber"
                    value={formData.contactNumber}
                    onChange={handleInputChange}
                    required
                    className="input-active"
                    style={{
                      width: "100%",
                      padding: "12px 16px",
                      borderRadius: "4px",
                      border: "1px solid #cbd5e1",
                      background: "#fff",
                      fontSize: "15px",
                      color: "#334155",
                      outline: "none",
                      transition: "all 0.2s"
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: "block", fontSize: "14px", fontWeight: 700, color: "#172d3e", marginBottom: "8px" }}>
                    Your message (optional)
                  </label>
                  <textarea 
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows="5"
                    className="input-active"
                    style={{
                      width: "100%",
                      padding: "12px 16px",
                      borderRadius: "4px",
                      border: "1px solid #cbd5e1",
                      background: "#fff",
                      fontSize: "15px",
                      color: "#334155",
                      outline: "none",
                      resize: "vertical",
                      transition: "all 0.2s"
                    }}
                  />
                </div>

                <div style={{ marginTop: "10px" }}>
                  <button 
                    type="submit"
                    disabled={formStatus === 'submitting'}
                    style={{
                      background: "#f7c600",
                      color: "#172d3e",
                      padding: "14px 45px",
                      fontSize: "15px",
                      fontWeight: 700,
                      border: "none",
                      borderRadius: "4px",
                      cursor: formStatus === 'submitting' ? 'not-allowed' : 'pointer',
                      boxShadow: "0 4px 12px rgba(247, 198, 0, 0.2)",
                      transition: "all 0.3s"
                    }}
                    onMouseOver={(e) => {
                      if (formStatus !== 'submitting') {
                        e.currentTarget.style.transform = "translateY(-2px)";
                        e.currentTarget.style.boxShadow = "0 8px 20px rgba(247, 198, 0, 0.35)";
                      }
                    }}
                    onMouseOut={(e) => {
                      if (formStatus !== 'submitting') {
                        e.currentTarget.style.transform = "translateY(0)";
                        e.currentTarget.style.boxShadow = "0 4px 12px rgba(247, 198, 0, 0.2)";
                      }
                    }}
                  >
                    {formStatus === 'submitting' ? 'Submitting...' : 'Submit'}
                  </button>
                </div>
              </form>
            </div>

          </div>
        </section>

        {/* LIGHTBOX COMPONENT */}
        {lightboxImage && (
          <div 
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: "rgba(10, 20, 30, 0.95)",
              zIndex: 99999,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              padding: "20px"
            }}
            onClick={closeLightbox}
          >
            {/* Close button */}
            <button 
              style={{
                position: "absolute",
                top: "20px",
                right: "20px",
                background: "transparent",
                border: "none",
                color: "#fff",
                fontSize: "30px",
                cursor: "pointer"
              }}
              onClick={closeLightbox}
            >
              ✕
            </button>

            {/* Title */}
            <h3 style={{ color: "#fff", fontSize: "20px", fontWeight: 800, marginBottom: "20px", textAlign: "center" }}>
              {lightboxTitle}
            </h3>

            {/* Image */}
            <img 
              src={lightboxImage} 
              alt="Expanded view" 
              style={{ 
                maxWidth: "95%", 
                maxHeight: "80vh", 
                borderRadius: "4px", 
                boxShadow: "0 10px 40px rgba(0,0,0,0.5)",
                objectFit: "contain"
              }} 
              onClick={(e) => e.stopPropagation()} // Stop closing on image click
            />
            
            <p style={{ color: "#ccc", fontSize: "13px", marginTop: "15px" }}>
              Click anywhere outside to close.
            </p>
          </div>
        )}

      </div>
      {formMessage && (
        <div style={{
          position: 'fixed', bottom: '2rem', left: '50%', transform: 'translateX(-50%)',
          background: formStatus === 'success' ? '#16a34a' : '#dc2626',
          color: '#fff', padding: '0.75rem 1.5rem', borderRadius: '0.5rem',
          boxShadow: '0 4px 12px rgba(0,0,0,0.2)', zIndex: 9999, fontSize: '0.95rem'
        }}>
          {formMessage}
        </div>
      )}
    </Layout>
  );
}
