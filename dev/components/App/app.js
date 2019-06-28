import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import * as moment from 'moment';
import { newsUpdate } from '../../actions';
import style from './app.scss';

import Loader from '../Loader';
import Exchange from '../Exchange';
import getExchange from '../../api';
import CarrencyItem from '../CarrencyItem';
import DaysItem from '../Calendar/DaysItem';
import MonthsItem from '../Calendar/MonthItem';
import YearsItem from '../Calendar/YearsItem';

let daysInMonth = moment(`${moment().format('YYYY-MM')}`, 'YYYY-MM').daysInMonth();

class App extends PureComponent {
    constructor() {
        super();
        this.state = {
            data: [],
            isLoading: false,
            today: moment().format('YYYYMMDD'),
            daysList: Array(daysInMonth).fill().map((e, index) => index + 1).map(
                (elem, index) => ({ id: index + 1, name: index < 9 ? `0${elem}` : elem }),
            ),
            monthList: moment.months().map((elem, index) => ({ id: `${index < 9 ? '0' : ''}${index + 1}`, name: elem })),
            yearsList: Array(15).fill().map((e, index) => moment().year() - index).map(
                (elem, index) => ({ id: index + 1, name: elem }),
            ),
            // error: null,
        };
        this.getData = this.getData.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.updateState = this.updateState.bind(this);
    }

    componentDidMount() {
        this.getData();
        this.updateState();
    }

    getData(carrencyName) {
        const { today } = this.state;
        const { newsUpdate: newsUpdateNew } = this.props;
        getExchange(today)
            .then((responce) => {
                this.setState({
                    isLoading: false,
                    data: responce.data,
                    // error: null,
                });
                const responceData = responce.data.filter(
                    item => (item.txt === carrencyName ? item : null),
                );
                newsUpdateNew(responceData);
            })
            .catch((reject) => {
                console.error('reject', reject);
                this.setState({
                    isLoading: false,
                    // error: ,
                });
            });
    }

    updateState() {
        const { monthList } = this.state;
        const chosedMonth = window.document.getElementsByClassName(style.calendar_unit)[2].value;
        const monthInNumber = monthList.filter(item => (
            item.name === chosedMonth ? item : null
        ))[0].id;
        const chosedYear = window.document.getElementsByClassName(style.calendar_unit)[3].value;
        daysInMonth = moment(`${chosedYear}-${monthInNumber}`, 'YYYY-MM').daysInMonth();
        this.setState({
            daysList: Array(daysInMonth).fill().map((day, index) => index + 1).map(
                (elem, index) => ({ id: index + 1, name: index < 9 ? `0${elem}` : elem }),
            ),
        });
    }

    handleChange(e) {
        e.preventDefault();
        const { monthList } = this.state;
        const chosedMonth = e.nativeEvent.path[0].form[2].value;
        const monthInNumber = monthList.filter(item => (
            item.name === chosedMonth ? item : null
        ))[0].id;
        const chosedYear = e.nativeEvent.path[0].form[3].value;
        daysInMonth = moment(`${chosedYear}-${monthInNumber}`, 'YYYY-MM').daysInMonth();
        this.setState({
            daysList: Array(daysInMonth).fill().map((k, index) => index + 1).map(
                (elem, index) => ({ id: index + 1, name: index < 9 ? `0${elem}` : elem }),
            ),
        });
    }

    handleSubmit(e) {
        e.preventDefault();
        const { monthList } = this.state;
        const carrencyName = e.nativeEvent.path[0].form[0].value;
        const chosedDay = e.nativeEvent.path[0].form[1].value;
        const chosedMonth = e.nativeEvent.path[0].form[2].value;
        const monthInNumber = monthList.filter(item => (
            item.name === chosedMonth ? item : null
        ))[0].id;
        const chosedYear = e.nativeEvent.path[0].form[3].value;
        this.setState({
            isLoading: true,
            today: `${chosedYear}${monthInNumber}${chosedDay}`,
        }, () => {
            this.getData(carrencyName);
        });
    }

    render() {
        const {
            isLoading,
            data,
            daysList,
            monthList,
            yearsList,
        } = this.state;
        const {
            storeInformation,
        } = this.props;
        return (
            isLoading
            ? (
                <div className={style.wrapper}>
                    <Loader />
                </div>
            ) : (
                <div className={style.wrapper}>
                    <form onChange={this.handleChange} className={style.form}>
                        <h2 className={style.form_title}>{`Today is ${moment().format('LL')}`}</h2>
                        <h3 className={style.form_subTitle}>
                            Please choose carrency and enter the day
                        </h3>
                        <div className={style.calendar}>
                            <select className={style.calendar_unit}>
                                {
                                    data.map(item => (
                                        <CarrencyItem
                                          key={item.r030}
                                          {...item}
                                        />
                                    ))
                                }
                            </select>
                            <select name="day" className={style.calendar_unit}>
                                {
                                    daysList.map(item => <DaysItem key={item.id} {...item} />)
                                }
                            </select>
                            <select name="month" className={style.calendar_unit}>
                                {
                                    monthList.map(item => (
                                        <MonthsItem key={item.id} {...item} />
                                    ))
                                }
                            </select>
                            <select name="year" className={style.calendar_unit}>
                                {
                                    yearsList.map(item => <YearsItem key={item.id} {...item} />)
                                }
                            </select>
                        </div>
                        <div className={style.form_submit}>
                            <input onClick={this.handleSubmit} className={style.calendar_but} type="button" value="Submit" />
                        </div>
                        {
                            data.length
                                ? storeInformation.map(exchange => (
                                    <Exchange key={exchange.r030} {...exchange} />
                                ))
                            : <div className={style.form_errorView}><h2>{'Sorry, we can\'t find your request. Push Submit once more'}</h2></div>
                        }
                    </form>
                </div>
            )
        );
    }
}

export default connect(storeInf => ({ storeInformation: storeInf }), { newsUpdate })(App);
