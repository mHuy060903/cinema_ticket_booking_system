Dưới đây là gợi ý nội dung cho tệp README để tóm tắt hệ thống đặt vé xem phim của bạn. Nội dung sẽ được viết rõ ràng, súc tích và đủ ý:  

---

# Cinema Ticket Booking System  

## Giới thiệu  
Cinema Ticket Booking System là một ứng dụng web cho phép người dùng tìm kiếm, đặt vé và quản lý thông tin vé xem phim trực tuyến. Hệ thống được xây dựng với giao diện thân thiện và chức năng tiện ích, giúp người dùng dễ dàng trải nghiệm dịch vụ mua vé xem phim nhanh chóng.  

## Công nghệ sử dụng  
- **Frontend**: ReactJS  
- **Backend**: Node.js  
- **Cơ sở dữ liệu**: Supabase  
![image](https://github.com/user-attachments/assets/c2a4a01e-7a94-445b-8a00-4cb519ad5781)

## Các tính năng chính  
1. **Đăng ký và đăng nhập**:  
   - Người dùng có thể đăng ký tài khoản mới và đăng nhập để sử dụng các chức năng của hệ thống.  
   - Xác thực người dùng qua Supabase.  

2. **Tìm kiếm phim**:  
   - Xem danh sách phim hiện đang chiếu.  
   - Xem thông tin chi tiết về từng bộ phim (thời lượng, thể loại, mô tả).  

3. **Đặt vé xem phim**:  
   - Lựa chọn rạp chiếu, thời gian, và ghế ngồi.  
   - Hiển thị trạng thái ghế đã đặt hoặc còn trống.  

4. **Thanh toán**:  
   - Hỗ trợ các phương thức thanh toán trực tuyến.  

5. **Quản lý đặt chỗ**:  
   - Xem danh sách các vé đã đặt.  
   - Hủy vé (nếu cần).  

6. **Chức năng quản trị**: *(nếu có)*  
   - Quản lý danh sách phim, rạp chiếu, lịch chiếu và ghế ngồi.  

## Cài đặt và chạy dự án  

### Yêu cầu  
- Node.js v16 trở lên  
- Supabase account  

### Các bước cài đặt  
1. Clone repository:  
   ```bash  
   git clone https://github.com/mHuy060903/cinema_ticket_booking_system.git  
   cd cinema_ticket_booking_system  
   ```  

2. Cài đặt các package:  
   ```bash  
   npm install  
   ```  

3. Thiết lập biến môi trường:  
   - Tạo tệp `.env` trong thư mục chính.  
   - Thêm các biến môi trường cần thiết để kết nối với Supabase.  
     ```env  
     REACT_APP_SUPABASE_URL=your_supabase_url  
     REACT_APP_SUPABASE_KEY=your_supabase_key  
     ```  

4. Chạy ứng dụng:  
   ```bash  
   npm start  
   ```  
   - Truy cập ứng dụng tại [http://localhost:3000](http://localhost:3000).  



---  

