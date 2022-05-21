import React, {Component} from "react";
import $ from "jquery";
import Card from "../components/cardEvent"
class Agenda extends Component {
    constructor(){
       super()
       this.state = {
            agenda: [
                {
                    nama: "Winterlude 2022",
                    tanggal: "4 - 21 Februari 2022",
                    lokasi: "Kanada",
                    gambar: "https://cdn0-production-images-kly.akamaized.net/2E3hqWvvvV7xS5XrUhDdFI05IMQ=/640x360/smart/filters:quality(75):strip_icc():format(jpeg)/kly-media-production/medias/3937409/original/036210800_1645091122-Winterlude_Canada.jpg"
                },
                {
                    nama: "Expo 2022 Dubai",
                    tanggal: "31 Maret 2022",
                    lokasi: "Uni Emirat Arab",
                    gambar: "https://cdn1-production-images-kly.akamaized.net/h6MUPCCddL7VzzKfnxVwoRmwVHA=/640x360/smart/filters:quality(75):strip_icc():format(jpeg)/kly-media-production/medias/3922446/original/013250100_1643855849-juli-kosolapova-be5B3YGDmtc-unsplash.jpg"
                },
                {
                    nama: "Floriade Expo 2022",
                    tanggal: "14 April - 9 Oktrober 2022",
                    lokasi: "Belanda",
                    gambar: "https://cdn0-production-images-kly.akamaized.net/wPnYkwmPGxF8p6zmQsKLBGUFgg4=/640x360/smart/filters:quality(75):strip_icc():format(jpeg)/kly-media-production/medias/3937410/original/046264100_1645091122-Floriade_Expo.jpg"
                },
                {
                    nama: "Inti Raymi 2022",
                    tanggal: "21-24 Juni 2022",
                    lokasi: "Peru",
                    gambar: "https://cuscodestiny.com/wp-content/uploads/2020/06/Inti-Raymi-portadablog.jpg"
                },
                {
                    nama: "MassKara Festival",
                    tanggal: "24 Oktober 2022",
                    lokasi: "Filipina",
                    gambar: "https://www.zenrooms.com/blog/wp-content/uploads/2020/07/masskara-festival-2-1280x720.jpg"
                },
                {
                    nama: "Grand Egyptian Museum",
                    tanggal: "November 2022",
                    lokasi: "Mesir",
                    gambar: "https://facadexs.com/wp-content/uploads/2018/01/GEM-01.jpg"
                },
           ],

            action: "",
            nama: "",
            tanggal: "",
            lokasi: "",
            gambar: "",
            selectedItem: null,
       } 
    }
    render(){
        return (
            <div className="container">
                <div className="row">
                    {this.state.agenda.map( (item, index) => (
                        <Card
                        nama={item.nama}
                        tanggal={item.tanggal}
                        lokasi={item.lokasi}
                        gambar={item.gambar}
                        onEdit={ () => this.Edit(item)}
                        onDrop={ () => this.Drop(item)}
                        />
                    ))}
                </div>

                {/* component modal sbg control manipulasi data */}
                <div className="modal" id="modal_agenda">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            {/* modal header */}
                            <div className="modal-body">
                                Form Agenda
                            </div>
                            {/* modal body */}
                            <div className="modal-body">
                            <form onSubmit={ev => this.Save(ev)}>
                                Nama Event :
                                <input type="text" className="form-control mb-2"
                                    value={this.state.nama}
                                    onChange={ ev => this.setState({nama:ev.target.value}) }
                                    required />
                                
                                Tanggal :
                                <input type="text" className="form-control mb-2"
                                    value={this.state.tanggal}
                                    onChange={ ev => this.setState({tanggal: ev.target.value}) }
                                    required />

                                Lokasi :
                                <input type="text" className="form-control b-2"
                                    value={this.state.lokasi}
                                    onChange={ ev => this.setState({lokasi: ev.target.value}) }
                                    required />
                                    
                                Gambar Agenda :
                                <input type="url" className="form-control mb-2"
                                    value={this.state.gambar}
                                    onChange={ ev => this.setState({gambar: ev.target.value}) }
                                    required />

                                <button className="btn btn-info btn-block" type="submit">
                                    Simpan
                                </button>
                            </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
    Add = () => {
        // menampilkan komponen modal
        $("#modal_agenda").show();
        this.setState({
            nama: "",
            tanggal: "",
            lokasi: "",
            gambar: "",
            action: "insert"
        })
    }
    Edit = (item) => {
        // menampilkan komponen modal
        $("#modal_agenda").show();
        this.setState({
        nama: item.nama,
        tanggal: item.tanggal,
        lokasi: item.lokasi,
        gambar: item.gambar,
        action: "update",
        selectedItem: item
        })
    }
    Save = (agenda) => {
        agenda.preventDefault();
        // menampung data state event
        let tempAgenda = this.state.agenda
        if (this.state.action === "insert") {
        // menambah data baru
        tempAgenda.push({
        nama: this.state.nama,
        tanggal: this.state.tanggal,
        lokasi: this.state.lokasi,
        gambar: this.state.gambar,
        })
    }else if(this.state.action === "update"){
        // menyimpan perubahan data
        let index = tempAgenda.indexOf(this.state.selectedItem)
        tempAgenda[index].nama = this.state.nama
        tempAgenda[index].tanggal = this.state.tanggal
        tempAgenda[index].lokasi = this.state.lokasi
        tempAgenda[index].gambar = this.state.gambar
    }
    this.setState({agenda : tempAgenda})
    // menutup komponen modal_agenda
    $("#modal_agenda").hide();
    }

    Drop = (item) => {
        // beri konfirmasi untuk menghapus data
        if(window.confirm("Apakah anda yakin ingin menghapus data ini?")){
        // menghapus data
        let tempAgenda = this.state.agenda
        // posisi index data yg akan dihapus
        let index = tempAgenda.indexOf(item)
        // hapus data
        tempAgenda.splice(index, 1)
        this.setState({event: tempAgenda})
        }
    }

}
export default Agenda;
