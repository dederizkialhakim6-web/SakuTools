
const hitungDiskon = document.getElementById("hitungDiskon");

if (hitungDiskon) {

    const harga = document.getElementById("harga");
    const persenDiskon = document.getElementById("persenDiskon");

    const hasilDiskon = document.getElementById("hasilDiskon");
    const pesan = document.getElementById("pesanDiskon");

    const formatRupiah = (angka) => {
        return new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
            maximumFractionDigits: 0
        }).format(angka);
    };

    hitungDiskon.addEventListener("click", function () {

        const nilaiHarga = harga.value.trim();
        const nilaiDiskon = persenDiskon.value.trim();

        if (nilaiHarga === "" || nilaiDiskon === "") {
            pesan.textContent = "Mohon isi semua kolom.";
            hasilDiskon.hidden = true;
            return;
        }

        const h = Number(nilaiHarga);
        const d = Number(nilaiDiskon);

        if (!Number.isFinite(h) || h <= 0) {
            pesan.textContent = "Harga harus lebih dari nol.";
            hasilDiskon.hidden = true;
            return;
        }

        if (!Number.isFinite(d) || d < 0 || d > 100) {
            pesan.textContent = "Diskon harus antara 0 sampai 100%.";
            hasilDiskon.hidden = true;
            return;
        }

        const potongan = h * d / 100;
        const hargaAkhir = h - potongan;

        document.getElementById("hargaAkhir").textContent =
            formatRupiah(hargaAkhir);

        document.getElementById("hargaAwalHasil").textContent =
            formatRupiah(h);

        document.getElementById("potonganHarga").textContent =
            formatRupiah(potongan);

        document.getElementById("diskonHasil").textContent =
            d + "%";

        pesan.textContent = "";
        hasilDiskon.hidden = false;
    });

    document.getElementById("resetDiskon").addEventListener("click", function () {

        harga.value = "";
        persenDiskon.value = "";

        pesan.textContent = "";
        hasilDiskon.hidden = true;
    });
}


// ===================================
// KALKULATOR KEUNTUNGAN
// ===================================

const tombolHitungKeuntungan = document.getElementById("hitungKeuntungan");

if (tombolHitungKeuntungan) {
    const inputModal = document.getElementById("hargaModal");
    const inputJual = document.getElementById("hargaJual");
    const inputBiaya = document.getElementById("biayaTambahan");

    const tombolReset = document.getElementById("resetKeuntungan");
    const pesan = document.getElementById("pesanKeuntungan");
    const hasil = document.getElementById("hasilKeuntungan");

    const formatRupiah = (angka) => {
        return new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
            maximumFractionDigits: 0
        }).format(angka);
    };

    tombolHitungKeuntungan.addEventListener("click", function () {
        const modal = Number(inputModal.value);
        const jual = Number(inputJual.value);
        const biaya = inputBiaya.value === "" ? 0 : Number(inputBiaya.value);

        hasil.hidden = true;
        pesan.textContent = "";

        if (
            inputModal.value === "" ||
            inputJual.value === "" ||
            modal <= 0 ||
            jual <= 0 ||
            biaya < 0 ||
            !Number.isFinite(modal) ||
            !Number.isFinite(jual) ||
            !Number.isFinite(biaya)
        ) {
            pesan.textContent = "Masukkan harga modal dan harga jual yang valid. Biaya tambahan tidak boleh negatif.";
            return;
        }

        const totalModal = modal + biaya;
        const keuntungan = jual - totalModal;
        const margin = (keuntungan / jual) * 100;

        document.getElementById("jenisHasil").textContent =
            keuntungan >= 0 ? "Keuntungan Bersih" : "Kerugian";

        document.getElementById("jumlahKeuntungan").textContent =
            formatRupiah(Math.abs(keuntungan));

        document.getElementById("modalHasil").textContent =
            formatRupiah(modal);

        document.getElementById("biayaHasil").textContent =
            formatRupiah(biaya);

        document.getElementById("totalModal").textContent =
            formatRupiah(totalModal);

        document.getElementById("jualHasil").textContent =
            formatRupiah(jual);

        document.getElementById("marginKeuntungan").textContent =
            margin.toFixed(2).replace(".", ",") + "%";

        hasil.hidden = false;
    });

    tombolReset.addEventListener("click", function () {
        inputModal.value = "";
        inputJual.value = "";
        inputBiaya.value = "";

        pesan.textContent = "";
        hasil.hidden = true;
    });
}



// ===================================
// QR CODE GENERATOR
// ===================================

const tombolBuatQR = document.getElementById("buatQR");

if (tombolBuatQR) {
    const inputQR = document.getElementById("isiQR");
    const tombolResetQR = document.getElementById("resetQR");
    const tombolDownloadQR = document.getElementById("downloadQR");

    const pesanQR = document.getElementById("pesanQR");
    const hasilQR = document.getElementById("hasilQR");
    const qrOutput = document.getElementById("qrOutput");

    let qrTersedia = false;

    tombolBuatQR.addEventListener("click", function () {
        const isi = inputQR.value.trim();

        pesanQR.textContent = "";
        hasilQR.hidden = true;
        qrTersedia = false;

        if (isi === "") {
            pesanQR.textContent = "Masukkan teks atau alamat website terlebih dahulu.";
            return;
        }

        if (typeof QRCode === "undefined") {
            pesanQR.textContent = "Library QR Code gagal dimuat. Periksa koneksi internet lalu muat ulang halaman.";
            return;
        }

        qrOutput.innerHTML = "";

        new QRCode(qrOutput, {
            text: isi,
            width: 220,
            height: 220,
            colorDark: "#000000",
            colorLight: "#ffffff",
            correctLevel: QRCode.CorrectLevel.H
        });

        hasilQR.hidden = false;
        qrTersedia = true;
    });

    tombolDownloadQR.addEventListener("click", function () {
        if (!qrTersedia) {
            return;
        }

        const canvas = qrOutput.querySelector("canvas");

        if (!canvas) {
            pesanQR.textContent = "QR Code belum siap. Coba buat ulang.";
            return;
        }

        const link = document.createElement("a");
        link.href = canvas.toDataURL("image/png");
        link.download = "qrcode-sakutools.png";
        link.click();
    });

    tombolResetQR.addEventListener("click", function () {
        inputQR.value = "";
        qrOutput.innerHTML = "";
        pesanQR.textContent = "";
        hasilQR.hidden = true;
        qrTersedia = false;
    });
}



// ===================================
// PENGHITUNG KATA
// ===================================

const teksPenghitung = document.getElementById("teksPenghitung");

if (teksPenghitung) {
    const jumlahKata = document.getElementById("jumlahKata");
    const jumlahKarakter = document.getElementById("jumlahKarakter");
    const karakterTanpaSpasi = document.getElementById("karakterTanpaSpasi");
    const jumlahKalimat = document.getElementById("jumlahKalimat");
    const jumlahParagraf = document.getElementById("jumlahParagraf");
    const tombolHapus = document.getElementById("resetPenghitung");

    function hitungTeks() {
        const teks = teksPenghitung.value;
        const teksBersih = teks.trim();

        // Menghitung kata
        const kata = teksBersih === ""
            ? []
            : teksBersih.split(/\s+/);

        // Menghitung karakter
        const karakter = teks.length;

        // Menghitung karakter tanpa spasi
        const tanpaSpasi = teks.replace(/\s/g, "").length;

        // Menghitung kalimat berdasarkan tanda baca
        const kalimat = teksBersih === ""
            ? []
            : teksBersih.split(/[.!?]+/).filter(item => item.trim() !== "");

        // Menghitung paragraf yang berisi teks
        const paragraf = teksBersih === ""
            ? []
            : teks.split(/\n+/).filter(item => item.trim() !== "");

        jumlahKata.textContent = kata.length;
        jumlahKarakter.textContent = karakter;
        karakterTanpaSpasi.textContent = tanpaSpasi;
        jumlahKalimat.textContent = kalimat.length;
        jumlahParagraf.textContent = paragraf.length;
    }

    teksPenghitung.addEventListener("input", hitungTeks);

    tombolHapus.addEventListener("click", function () {
        teksPenghitung.value = "";
        hitungTeks();
        teksPenghitung.focus();
    });

    hitungTeks();
}



// ===================================
// PENGUBAH TEKS
// ===================================

const teksAsli = document.getElementById("teksAsli");

if (teksAsli) {
    const hasilTeks = document.getElementById("hasilTeks");
    const tombolFormat = document.querySelectorAll("[data-format]");
    const tombolSalin = document.getElementById("salinTeks");
    const tombolReset = document.getElementById("resetPengubah");
    const pesan = document.getElementById("pesanPengubah");

    tombolFormat.forEach(function (tombol) {
        tombol.addEventListener("click", function () {
            const teks = teksAsli.value;
            const format = tombol.dataset.format;

            pesan.textContent = "";

            if (teks.trim() === "") {
                pesan.textContent = "Masukkan teks terlebih dahulu.";
                hasilTeks.value = "";
                return;
            }

            let hasil = "";

            switch (format) {
                case "upper":
                    hasil = teks.toUpperCase();
                    break;

                case "lower":
                    hasil = teks.toLowerCase();
                    break;

                case "title":
                    hasil = teks.toLowerCase().replace(
                        /(^|[\s])(\p{L})/gu,
                        function (cocok, pemisah, huruf) {
                            return pemisah + huruf.toUpperCase();
                        }
                    );
                    break;

                case "sentence":
                    hasil = teks.toLowerCase().replace(
                        /(^\s*|[.!?]\s+)(\p{L})/gu,
                        function (cocok, pemisah, huruf) {
                            return pemisah + huruf.toUpperCase();
                        }
                    );
                    break;

                case "reverse":
                    hasil = Array.from(teks).map(function (huruf) {
                        if (huruf === huruf.toUpperCase()) {
                            return huruf.toLowerCase();
                        }

                        return huruf.toUpperCase();
                    }).join("");
                    break;

                case "spaces":
                    hasil = teks
                        .split("\n")
                        .map(baris => baris.replace(/[ \t]+/g, " ").trim())
                        .join("\n");
                    break;
            }

            hasilTeks.value = hasil;
        });
    });

    tombolSalin.addEventListener("click", async function () {
        if (hasilTeks.value === "") {
            pesan.textContent = "Belum ada hasil untuk disalin.";
            return;
        }

        try {
            await navigator.clipboard.writeText(hasilTeks.value);
            pesan.textContent = "Hasil berhasil disalin!";
        } catch (error) {
            hasilTeks.select();
            const berhasil = document.execCommand("copy");

            pesan.textContent = berhasil
                ? "Hasil berhasil disalin!"
                : "Tidak dapat menyalin. Silakan salin teks secara manual.";
        }
    });

    tombolReset.addEventListener("click", function () {
        teksAsli.value = "";
        hasilTeks.value = "";
        pesan.textContent = "";
    });
}


// ===================================
// KONVERSI SATUAN
// ===================================

const kategoriSatuan = document.getElementById("kategoriSatuan");

if (kategoriSatuan) {
    const inputNilai = document.getElementById("nilaiSatuan");
    const satuanAwal = document.getElementById("satuanAwal");
    const satuanTujuan = document.getElementById("satuanTujuan");
    const tombolKonversi = document.getElementById("tombolKonversi");
    const tombolReset = document.getElementById("resetKonversi");

    const pesan = document.getElementById("pesanKonversi");
    const hasil = document.getElementById("hasilKonversi");
    const nilaiHasil = document.getElementById("nilaiHasil");
    const detailKonversi = document.getElementById("detailKonversi");

    const daftarSatuan = {
        panjang: {
            km: { nama: "Kilometer", faktor: 1000 },
            m: { nama: "Meter", faktor: 1 },
            cm: { nama: "Centimeter", faktor: 0.01 },
            mm: { nama: "Milimeter", faktor: 0.001 }
        },

        berat: {
            kg: { nama: "Kilogram", faktor: 1000 },
            g: { nama: "Gram", faktor: 1 },
            mg: { nama: "Miligram", faktor: 0.001 }
        },

        volume: {
            l: { nama: "Liter", faktor: 1000 },
            ml: { nama: "Mililiter", faktor: 1 }
        },

        suhu: {
            C: { nama: "Celsius" },
            F: { nama: "Fahrenheit" },
            K: { nama: "Kelvin" }
        }
    };

    function isiPilihanSatuan() {
        const kategori = kategoriSatuan.value;
        const daftar = daftarSatuan[kategori];

        satuanAwal.innerHTML = "";
        satuanTujuan.innerHTML = "";

        Object.entries(daftar).forEach(function ([kode, data]) {
            const opsiAwal = document.createElement("option");
            opsiAwal.value = kode;
            opsiAwal.textContent = data.nama;

            const opsiTujuan = document.createElement("option");
            opsiTujuan.value = kode;
            opsiTujuan.textContent = data.nama;

            satuanAwal.appendChild(opsiAwal);
            satuanTujuan.appendChild(opsiTujuan);
        });

        const pilihanTujuan = Object.keys(daftar);

        if (pilihanTujuan.length > 1) {
            satuanTujuan.selectedIndex = 1;
        }

        pesan.textContent = "";
        hasil.hidden = true;
    }

    function konversiSuhu(nilai, dari, ke) {
        let celsius;

        if (dari === "C") {
            celsius = nilai;
        } else if (dari === "F") {
            celsius = (nilai - 32) * 5 / 9;
        } else {
            celsius = nilai - 273.15;
        }

        if (ke === "C") {
            return celsius;
        }

        if (ke === "F") {
            return (celsius * 9 / 5) + 32;
        }

        return celsius + 273.15;
    }

    tombolKonversi.addEventListener("click", function () {
        const nilai = Number(inputNilai.value);
        const kategori = kategoriSatuan.value;
        const dari = satuanAwal.value;
        const ke = satuanTujuan.value;

        pesan.textContent = "";
        hasil.hidden = true;

        if (
            inputNilai.value.trim() === "" ||
            !Number.isFinite(nilai)
        ) {
            pesan.textContent = "Masukkan angka yang valid terlebih dahulu.";
            return;
        }

        if (kategori === "suhu" && ke === "K" && (
            (dari === "C" && nilai < -273.15) ||
            (dari === "F" && nilai < -459.67) ||
            (dari === "K" && nilai < 0)
        )) {
            pesan.textContent = "Nilai suhu tidak boleh lebih rendah dari nol mutlak.";
            return;
        }

        let hasilKonversi;

        if (kategori === "suhu") {
            hasilKonversi = konversiSuhu(nilai, dari, ke);
        } else {
            const faktorAwal = daftarSatuan[kategori][dari].faktor;
            const faktorTujuan = daftarSatuan[kategori][ke].faktor;

            hasilKonversi = (nilai * faktorAwal) / faktorTujuan;
        }

        const angkaTampil = Number(hasilKonversi.toPrecision(10));

        nilaiHasil.textContent = angkaTampil.toLocaleString("id-ID", {
            maximumFractionDigits: 8
        });

        detailKonversi.textContent =
            daftarSatuan[kategori][dari].nama +
            " → " +
            daftarSatuan[kategori][ke].nama;

        hasil.hidden = false;
    });

    kategoriSatuan.addEventListener("change", isiPilihanSatuan);

    tombolReset.addEventListener("click", function () {
        inputNilai.value = "";
        pesan.textContent = "";
        hasil.hidden = true;
        isiPilihanSatuan();
    });

    isiPilihanSatuan();
}
