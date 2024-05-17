
const App = {
    data() {
        return {
            url: 'http://nexifytw.mynetgear.com:45000',
            tempData: [],
        }
    },
    methods: {
        getData() {
            axios.get(`${this.url}/api/Record/GetRecords`)
                .then(res => {
                    console.log(res.data.Data);
                    this.tempData = res.data.Data.map(record => {
                        const date = new Date(record.DateOfBirth);
                        const year = date.getFullYear();
                        const month = (date.getMonth() + 1).toString().padStart(2, '0');
                        const day = date.getDate().toString().padStart(2, '0');
                        return {
                            ...record,
                            DateOfBirth: `${year}-${month}-${day}`
                        };
                    });
                    // alert('更新成功');

                })
                .catch(err => console.log(err))
        },
        addData() {
            this.tempData.unshift({
                Name: '',
                DateOfBirth: '',
                Salary: '',
                Address: ''
            })
        },
        postData() {
            axios.post(`http://nexifytw.mynetgear.com:45000/api/Record/SaveRecords`, this.tempData)
                .then(res => {
                    console.log(res.data);
                    alert('儲存成功');
                    this.getData();
                })
                .catch(err => {
                    console.log(err);
                    alert('儲存失敗');
                }
                )
        }
    },
    mounted() {
        this.getData();
    }

}

Vue.createApp(App).mount('#app');