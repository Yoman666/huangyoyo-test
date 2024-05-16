
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
                    // 格式化日期並存回tempData中
                    this.tempData = res.data.Data.map(record => {
                        // 將日期字串轉換為日期物件
                        const date = new Date(record.DateOfBirth);
                        // 格式化日期為 "年-月-日"
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
            // const data = {
            //     Name: "test",
            //     DateOfBirth: "2024-05-13T08:27:16.420Z",
            //     Salary: 0,
            //     Address: "test2"
            // };
            axios.post(`http://nexifytw.mynetgear.com:45000/api/Record/SaveRecords`, this.tempData)
                .then(res => {
                    console.log(res.data);
                    alert('儲存成功');
                    this.getData();
                })
                .catch(err => console.log(err))
        }
    },
    mounted() {
        this.getData();
    }

}

Vue.createApp(App).mount('#app');