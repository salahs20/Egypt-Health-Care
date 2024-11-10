import React from "react";
import { Typography, Button } from "@material-tailwind/react";
import { Link } from "react-router-dom";

const Services = () => {
  const services = [
    { title: "استشارات طبية", description: "نقدم استشارات طبية مع مجموعة من الأطباء المتخصصين." },
    { title: "رعاية أسنان", description: "خدمات رعاية أسنان تشمل الفحوصات والعلاجات المختلفة." },
    { title: "جراحة", description: "نحن نقدم خدمات جراحية مع أفضل الأطباء والجراحين." },
    { title: "علاج طبيعي", description: "خدمات العلاج الطبيعي لمساعدتك في التعافي من الإصابات والآلام." },
    { title: "رعاية صحية منزلية", description: "نقدم خدمات الرعاية الصحية المنزلية لك ولأحبائك." },
    { title: "تشخيص الأمراض", description: "نساعدك في تشخيص الأمراض من خلال الفحوصات المتقدمة." },
    { title: "إعادة التأهيل", description: "برامج إعادة التأهيل للمرضى بعد العمليات الجراحية أو الإصابات." },
    { title: "استشارات تغذية", description: "نقدم استشارات غذائية لمساعدتك في تحسين صحتك العامة." }
  ];

  const healthTips = [
    { title: "اشرب الماء بانتظام", description: "الماء هو أساس الحياة، تأكد من شرب كميات كافية للحفاظ على صحتك العامة." },
    { title: "ممارسة الرياضة", description: "ممارسة التمارين الرياضية بانتظام تساعد على تحسين اللياقة البدنية وتقوية القلب." },
    { title: "الراحة والنوم الكافي", description: "النوم الكافي هو أحد العوامل المهمة لصحة جسمك وعقلك." },
    { title: "اتباع نظام غذائي متوازن", description: "تناول الطعام الصحي والمتوازن يعزز جهاز المناعة ويساعد في الوقاية من الأمراض." },
    { title: "إدارة التوتر", description: "تجنب التوتر الزائد وحاول الاسترخاء من خلال تقنيات التنفس والتأمل." }
  ];

  return (
    <div className="pt-[5rem] px-4">
      {/* Services Section */}
      <section>
        <Typography variant="h3" color="blue" className="text-center font-semibold mb-8">
          خدماتنا الطبية
        </Typography>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition duration-300">
              <Typography variant="h5" color="blue" className="font-semibold">
                {service.title}
              </Typography>
              <Typography variant="paragraph" color="gray" className="mt-4 text-gray-600">
                {service.description}
              </Typography>
              <Button color="blue" size="sm" className="mt-4">
                مزيد من التفاصيل
              </Button>
            </div>
          ))}
        </div>
      </section>

      {/* Health Tips Section */}
      <section className="mt-12">
        <Typography variant="h3" color="blue" className="text-center font-semibold mb-8">
          نصائح صحية
        </Typography>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {healthTips.map((tip, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition duration-300">
              <Typography variant="h5" color="blue" className="font-semibold">
                {tip.title}
              </Typography>
              <Typography variant="paragraph" color="gray" className="mt-4 text-gray-600">
                {tip.description}
              </Typography>
            </div>
          ))}
        </div>
      </section>

      {/* Contact Button Section */}
      <div className="text-center mt-12 pb-[4rem]">
        <Link to="contact">
          <Button color="blue" size="lg" className="rounded-md">
            تواصل معنا
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default Services;
