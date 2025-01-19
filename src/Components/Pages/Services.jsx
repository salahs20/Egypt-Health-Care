import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Services = () => {
  const [services, setServices] = useState([]);
  // const services = [
  //   { title: "استشارات طبية", description: "نقدم استشارات طبية مع مجموعة من الأطباء المتخصصين." },
  //   { title: "رعاية أسنان", description: "خدمات رعاية أسنان تشمل الفحوصات والعلاجات المختلفة." },
  //   { title: "جراحة", description: "نحن نقدم خدمات جراحية مع أفضل الأطباء والجراحين." },
  //   { title: "علاج طبيعي", description: "خدمات العلاج الطبيعي لمساعدتك في التعافي من الإصابات والآلام." },
  //   { title: "رعاية صحية منزلية", description: "نقدم خدمات الرعاية الصحية المنزلية لك ولأحبائك." },
  //   { title: "تشخيص الأمراض", description: "نساعدك في تشخيص الأمراض من خلال الفحوصات المتقدمة." },
  //   { title: "إعادة التأهيل", description: "برامج إعادة التأهيل للمرضى بعد العمليات الجراحية أو الإصابات." },
  //   { title: "استشارات تغذية", description: "نقدم استشارات غذائية لمساعدتك في تحسين صحتك العامة." },
  // ];
  const apiUrl = import.meta.env.VITE_Url; // استبدل هذا بعنوان API الخاص بك

  useEffect(() => {
    // جلب الخدمات من API عند تحميل المكون
    const fetchServices = async () => {
      try {
        const response = await axios.get(`${apiUrl}/services`);
        setServices(response.data);
      } catch (err) {
        console.error("خطأ في جلب البيانات:", err);
      }
    };

    fetchServices();
  }, []);

  const healthTips = [
    {
      title: "اشرب الماء بانتظام",
      description:
        "الماء هو أساس الحياة، تأكد من شرب كميات كافية للحفاظ على صحتك العامة.",
    },
    {
      title: "ممارسة الرياضة",
      description:
        "ممارسة التمارين الرياضية بانتظام تساعد على تحسين اللياقة البدنية وتقوية القلب.",
    },
    {
      title: "الراحة والنوم الكافي",
      description: "النوم الكافي هو أحد العوامل المهمة لصحة جسمك وعقلك.",
    },
    {
      title: "اتباع نظام غذائي متوازن",
      description:
        "تناول الطعام الصحي والمتوازن يعزز جهاز المناعة ويساعد في الوقاية من الأمراض.",
    },
    {
      title: "إدارة التوتر",
      description:
        "تجنب التوتر الزائد وحاول الاسترخاء من خلال تقنيات التنفس والتأمل.",
    },
  ];

  return (
    <div className="pt-20 px-4">
      {/* Services Section */}
      <section className="animate-fade-in-up">
        <h3 className="text-3xl font-semibold text-blue-600 text-center mb-8" >
          خدماتنا الطبية
        </h3>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((services, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition duration-300 transform hover:-translate-y-2 text-end"
            >
              <h4 className="text-xl font-semibold text-blue-600">
                {services.title}
              </h4>
              <p className="mt-4 text-gray-600">{services.description}</p>
              <button className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">
                مزيد من التفاصيل
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Health Tips Section */}
      <section className="mt-12 animate-fade-in-up text-end">
        <h3 className="text-3xl font-semibold text-blue-600 text-center mb-8">
          نصائح صحية
        </h3>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {healthTips.map((tip, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition duration-300 transform hover:-translate-y-2"
            >
              <h4 className="text-xl font-semibold text-blue-600">
                {tip.title}
              </h4>
              <p className="mt-4 text-gray-600">{tip.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Contact Button Section */}
      <div className="text-center mt-12 pb-16 animate-fade-in-up">
        <Link to="/contact">
          <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition duration-300">
            تواصل معنا
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Services;
