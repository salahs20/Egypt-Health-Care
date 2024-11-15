import React, { useState } from 'react';
import { Input, Textarea, Button, Select, Option } from '@material-tailwind/react';

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('تم إرسال الطلب بنجاح');
  };

  return (
    <div className="pt-[4rem] pb-8 px-4">
      {/* Form Section */}
      <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-3xl font-semibold text-blue-700 mb-6 text-center">
          حجز موعد استشارة طبية
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col md:grid grid-cols-2 gap-6">
            {/* Name Field */}
            <div className="flex flex-col">
              <Input
                label="الاسم الكامل"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            {/* Email Field */}
            <div className="flex flex-col">
              <Input
                type="email"
                label="البريد الإلكتروني"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            {/* Phone Field */}
            <div className="flex flex-col">
              <Input
                type="text"
                label="رقم الهاتف"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
              />
            </div>

            {/* Service Field */}
            <div className="flex flex-col">
              <Select
                label="الخدمة المطلوبة"
                name="service"
                value={formData.service}
                onChange={(value) => setFormData({ ...formData, service: value })}
                required
              >
                <Option value="">اختر الخدمة</Option>
                <Option value="استشارة طبية">استشارة طبية</Option>
                <Option value="رعاية أسنان">رعاية أسنان</Option>
                <Option value="جراحة">جراحة</Option>
              </Select>
            </div>

            {/* Message Field */}
            <div className="flex flex-col col-span-2">
              <Textarea
                label="ملاحظات أو تفاصيل إضافية"
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={4}
                
              />
            </div>
          </div>

          <div className="text-center mt-6">
            <Button type="submit" color="blue">
              إرسال الطلب
            </Button>
          </div>
        </form>
      </div>

      {/* Contact Info Section */}
      <div className="text-center mt-16 text-gray-600">
        <h3 className="text-2xl font-semibold text-blue-700 mb-4">معلومات التواصل</h3>
        <p className="text-lg">إذا كنت بحاجة إلى مزيد من المساعدة، يمكنك التواصل معنا عبر الوسائل التالية:</p>
        <div className="mt-4">
          <p><strong>الهاتف:</strong> +20 123 456 789</p>
          <p><strong>البريد الإلكتروني:</strong> support@cliniccare.com</p>
          <p><strong>العنوان:</strong> 123 شارع الأطباء، القاهرة، مصر</p>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
