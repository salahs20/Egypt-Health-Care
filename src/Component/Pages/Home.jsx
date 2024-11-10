import React from "react";
import { Link } from "react-router-dom";
import { Typography, Button } from "@material-tailwind/react";

const Home = () => {
  return (
    <>
      <div className="min-h-screen flex flex-col items-center justify-center md:flex md:flex-row md:justify-between   pt-[4rem] px-4">
        {/* Logo Section */}
        <div className=" text-[3rem] mb-8 md:w-1/2 text-center md:text-start w-screen">
          <Typography variant="h1" color="blue" className="font-bold ">
            Egypt Health Care
          </Typography>
          <Typography
            variant="paragraph"
            color="gray"
            className="mt-4 max-w-3xl mx-auto text-lg md:text-xl "
          >
            مرحبا بكم في مصر للرعاية الصحية ، شريكك الموثوق للخدمات الطبية
            والمعلومات الصحية. مهمتنا هي تزويدك بخدمات رعاية صحية عالية الجودة
            ومشورة الخبراء بشأن الوقاية من الأمراض والنصائح الصحية وإدارة
            الأدوية. نحن هنا لإرشادك في كل خطوة على الطريق في رحلتك الصحية.
          </Typography>
          {/* Call to Action Section */}
          <div className=" flex justify-center gap-8  md:justify-start">
            <div className=" mt-6 ms-4">
              <Link to="/services">
                <Button color="blue" size="lg" className="rounded-md">
                  تصفح خدماتنا
                </Button>
              </Link>
            </div>
            <div className="text-star mt-6">
              <Link to="/contact">
                <Button color="blue" size="lg" className="rounded-md">
                  احجزموعد
                </Button>
              </Link>
            </div>
          </div>
        </div>
        <div className="flex justify-center w-full h-screen md:w-1/2 ">
          <img src="" alt="" />
          
        </div>
      </div>
    </>
  );
};

export default Home;
