Cài đặt (Windows, Word desktop):
1) npm i -g http-server ; npx office-addin-dev-certs install
2) Trong thư mục này: http-server -S -C %USERPROFILE%\.office-addin-dev-certs\localhost.crt -K %USERPROFILE%\.office-addin-dev-certs\localhost.key -p 3000
3) Chép manifest.xml vào một thư mục chia sẻ (vd C:\addins), Word > File > Options > Trust Center > Trust Center Settings > Trusted Add-in Catalogs: thêm đường dẫn \\localhost\addins (hoặc UNC của thư mục), tick "Show in Menu".
4) Mở lại Word > Insert > My Add-ins > SHARED FOLDER > chọn add-in.
Hoặc đưa các file lên GitHub Pages rồi sửa https://localhost:3000 trong manifest.xml thành địa chỉ đó.

Cách hoạt động (tham khảo Google Docs):
- Chính tả = đối chiếu từ điển: add-in kiểm tra cấu tạo âm tiết tiếng Việt + tra từ điển âm tiết (lexicon.js, dựng từ danh sách Viet74K).
- Gợi ý được xếp hạng theo độ phổ biến của âm tiết và theo ngữ cảnh (cặp âm tiết liền kề có trong từ ghép), tương tự việc Docs xếp hạng gợi ý theo mô hình ngôn ngữ.
- Giao diện duyệt từng lỗi: tự chọn lỗi trong văn bản, Chấp nhận gợi ý / Bỏ qua / Luôn bỏ qua / Lỗi tiếp.
- Đỏ = sai chính tả, xanh = có thể sai theo ngữ cảnh (giống gạch chân xanh của Docs).
- "Tô sáng lỗi" chỉ để đánh dấu, "Bỏ tô sáng" xoá tô sáng của các từ lỗi đó.

Bản cập nhật 2:
- Bắt lỗi gõ không dấu theo cặp từ (vd "bao cao" -> "báo cáo", "nghi dinh" -> "nghị định") nhờ từ điển cụm từ và danh sách cụm từ hành chính, kho bạc trong domain.txt.
- Tên địa danh hành chính toàn quốc (xã, huyện, tỉnh) được nạp sẵn, vd Ea Drăng, Krông Búk.
- Từ điển riêng trong khung, lưu trên máy; từ lạ lặp lại từ 3 lần tự được bỏ qua.
- Kiểm tra dấu câu: thừa/thiếu dấu cách, lặp dấu câu, đầu câu viết thường, ngoặc không cân đối, "đã sẽ", "các những".
- Muốn thêm cụm từ chuyên ngành: thêm vào khung "Từ điển riêng" trong add-in (domain.txt chỉ là danh sách cụm từ đã nạp sẵn để tham khảo).
