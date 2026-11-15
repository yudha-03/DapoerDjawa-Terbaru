export default function PrivacyPolicy() {
  return (
        <div className="rounded-3xl border border-gray-100 bg-white p-8 shadow-sm md:p-12">
          <h1 className="mb-2 text-2xl md:text-3xl font-bold text-gray-900">Kebijakan Privasi</h1>
          <p className="mb-8 border-b border-gray-100 pb-8 text-sm text-gray-500">Pembaruan Terakhir: Oktober 2026</p>
          <div className="space-y-8 text-gray-600">
            <section>
              <h2 className="mb-3 text-lg font-bold text-gray-900">1. Data yang Kami Kumpulkan</h2>
              <p className="mb-3 leading-relaxed">Saat Anda menggunakan layanan DapoerDjawa, kami dapat mengumpulkan data berikut:</p>
              <ul className="list-disc space-y-2 pl-5 leading-relaxed">
                <li><strong>Data Identitas</strong> - Nama lengkap, alamat email, dan nomor telepon yang Anda berikan saat mendaftar atau checkout.</li>
                <li><strong>Data Akun Google</strong> - Apabila Anda mendaftar menggunakan Google, kami menerima nama, email, dan foto profil dari akun Google Anda.</li>
                <li><strong>Data Pengiriman</strong> - Alamat lengkap, kode pos, kecamatan, dan kota tujuan pengiriman yang Anda masukkan saat checkout.</li>
                <li><strong>Data Transaksi</strong> - Riwayat pesanan, metode pembayaran yang dipilih, dan status pengiriman.</li>
                <li><strong>Data Teknis</strong> - Cookie otentikasi untuk menjaga sesi login Anda tetap aktif.</li>
              </ul>
            </section>

            <section>
              <h2 className="mb-3 text-lg font-bold text-gray-900">2. Tujuan Penggunaan Data</h2>
              <p className="mb-3 leading-relaxed">Data yang kami kumpulkan digunakan untuk:</p>
              <ul className="list-disc space-y-2 pl-5 leading-relaxed">
                <li>Memproses dan mengirimkan pesanan Anda.</li>
                <li>Memverifikasi identitas dan keamanan akun.</li>
                <li>Menghubungi Anda terkait status pesanan atau informasi penting lainnya.</li>
                <li>Meningkatkan kualitas layanan dan pengalaman belanja melalui analisis data transaksi (termasuk rekomendasi bundling produk).</li>
                <li>Memenuhi kewajiban hukum yang berlaku di Indonesia.</li>
              </ul>
            </section>

            <section>
              <h2 className="mb-3 text-lg font-bold text-gray-900">3. Penyimpanan dan Keamanan Data</h2>
              <ul className="list-disc space-y-2 pl-5 leading-relaxed">
                <li>Data Anda disimpan pada server yang dilindungi oleh enkripsi dan protokol keamanan standar industri.</li>
                <li>Sistem penyimpanan data kami dilengkapi dengan protokol keamanan untuk memastikan setiap pengguna hanya dapat mengakses data miliknya sendiri.</li>
                <li>Pembayaran diproses melalui Midtrans yang telah tersertifikasi PCI-DSS. DapoerDjawa tidak menyimpan data kartu kredit atau debit Anda.</li>
                <li>Kata sandi akun Anda disimpan dalam bentuk hash dan tidak dapat dibaca oleh siapa pun, termasuk tim kami.</li>
              </ul>
            </section>

            <section>
              <h2 className="mb-3 text-lg font-bold text-gray-900">4. Berbagi Data dengan Pihak Ketiga</h2>
              <p className="mb-3 leading-relaxed">Kami tidak menjual data pribadi Anda kepada pihak mana pun. Data hanya dibagikan kepada:</p>
              <ul className="list-disc space-y-2 pl-5 leading-relaxed">
                <li><strong>Penyedia Layanan Pengiriman</strong> - Nama, alamat, dan nomor telepon diteruskan ke kurir untuk keperluan pengiriman paket.</li>
                <li><strong>Penyedia Layanan Pembayaran</strong> - Data transaksi diteruskan ke Midtrans untuk memproses pembayaran.</li>
                <li><strong>Otoritas Hukum</strong> - Apabila diwajibkan oleh peraturan perundang-undangan yang berlaku.</li>
              </ul>
            </section>

            <section>
              <h2 className="mb-3 text-lg font-bold text-gray-900">5. Hak Pengguna</h2>
              <p className="mb-3 leading-relaxed">Sesuai dengan Undang-Undang Perlindungan Data Pribadi (UU PDP) Nomor 27 Tahun 2022, Anda memiliki hak untuk:</p>
              <ul className="list-disc space-y-2 pl-5 leading-relaxed">
                <li>Mengakses dan melihat data pribadi Anda melalui halaman profil.</li>
                <li>Memperbarui atau memperbaiki data yang tidak akurat.</li>
                <li>Meminta penghapusan akun dan data pribadi Anda dengan menghubungi Customer Service kami via WhatsApp.</li>
                <li>Menarik persetujuan atas penggunaan data kapan saja.</li>
              </ul>
            </section>

            <section>
              <h2 className="mb-3 text-lg font-bold text-gray-900">6. Cookie</h2>
              <p className="leading-relaxed">
                DapoerDjawa menggunakan cookie yang diperlukan untuk menjaga sesi login Anda. Kami tidak menggunakan cookie pelacakan (tracking cookies) untuk keperluan iklan. Cookie sesi akan otomatis terhapus saat Anda logout dari akun.
              </p>
            </section>

            <section>
              <h2 className="mb-3 text-lg font-bold text-gray-900">7. Perubahan Kebijakan</h2>
              <p className="leading-relaxed">
                Kami berhak memperbarui Kebijakan Privasi ini sewaktu-waktu. Perubahan akan dipublikasikan di halaman ini beserta tanggal pembaruan terakhir. Dengan terus menggunakan layanan DapoerDjawa setelah perubahan dipublikasikan, Anda dianggap menyetujui kebijakan yang telah diperbarui.
              </p>
            </section>

            <section>
              <h2 className="mb-3 text-lg font-bold text-gray-900">8. Hubungi Kami</h2>
              <p className="leading-relaxed">
                Apabila Anda memiliki pertanyaan atau keluhan terkait kebijakan privasi ini, silakan hubungi kami melalui WhatsApp di nomor <a href="https://wa.me/62895383270632" target="_blank" rel="noopener noreferrer" className="font-semibold text-gray-900 hover:underline">+62 895-3832-70632</a>.
              </p>
            </section>
          </div>
        </div>
  );
}
