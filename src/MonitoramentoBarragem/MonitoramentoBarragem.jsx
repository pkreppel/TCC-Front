import React, { Component } from 'react'
import {Bar, Doughnut, Line} from 'react-chartjs-2';
import {Col, Row, Container} from 'reactstrap'

export class MonitoramentoBarragem extends Component {
    constructor(){
        super(); 
        this.state = {
            bar : {
                datasets: [{
                        label: 'Baixa',
                        data: [10, 2, 3, 5, 4, 3, 3, 2],
                      backgroundColor:"#3e95cd"
                    }, {
                        label: 'Média',
                        data: [10, 1, 4, 4, 5, 4, 4, 3],
                      backgroundColor:  "#8e5ea2"
                    },{
                        label: 'Alta',
                        data: [10, 1, 1, 0, 0, 1, 1, 1],
                      backgroundColor: "#3cba9f"
                    }],
                    labels: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto']
                },
                options: {
                  title: {
                    display: true,
                    text: 'Riscos / Criticidade'
                  },
                  tooltips: {
                    mode: 'index',
                    intersect: false
                  },
                  responsive: true,
                  scales: {
                    yAxes: [{ 
                      stacked: true,
                      scaleLabel: {
                        display: true,
                        labelString: "Quantidade"
                      }
                    }],
                    xAxes: [{ 
                      stacked: true,
                      scaleLabel: {
                        display: true,
                        labelString: "Meses"
                      }
                    }]
                  
                }
            },
            doughnut : {
                  labels: [
                    "Baixa",
                    "Média",
                    "Alta"
                  ],
                  datasets: [
                    {
                      data: [3,3,4],
                      backgroundColor: ["#3e95cd", "#8e5ea2", "#3cba9f"],
                      hoverBackgroundColor: ["#3e95cd", "#8e5ea2", "#3cba9f"]
                    }
                  ]
                },
            barMixedData:{
                datasets: [{
                    label: 'Meta',
                    type: 'line',
                    data: [5, 5, 5, 5, 5, 5, 5, 5],
                    fill: false,
                    borderColor: '#EC932F',
                    backgroundColor: '#EC932F',
                    pointBorderColor: '#EC932F',
                    pointBackgroundColor: '#EC932F',
                    pointHoverBackgroundColor: '#EC932F',
                    pointHoverBorderColor: '#EC932F',
                    yAxisID: 'y-axis-2'
                }, {
                    type: 'bar',
                    label: 'Riscos Remanescentes Mês',
                    data: [6, 4, 3, 0, 10, 5, 4, 5],
                    fill: false,
                    backgroundColor: '#3e95cd',
                    borderColor: '#3e95cd',
                    hoverBackgroundColor: '#3e95cd',
                    hoverBorderColor: '#3e95cd',
                    yAxisID: 'y-axis-1'
                }]
            },
            barMixedOptions:{
                responsive: true,
                tooltips: {
                  mode: 'label'
                },
                elements: {
                  line: {
                    fill: false
                  }
                },
                scales: {
                  xAxes: [{
                    display: true,
                    gridLines: {
                      display: false
                    },
                    labels: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto'],
                  }],
                  yAxes: [{
                    type: 'linear',
                    display: true,
                    position: 'left',
                    id: 'y-axis-1',
                    gridLines: {
                      display: false
                    },
                    labels: {
                      show: true
                    }
                  }, {
                    type: 'linear',
                    display: true,
                    position: 'right',
                    id: 'y-axis-2',
                    gridLines: {
                      display: false
                    },
                    labels: {
                      show: true
                    }
                  }]
                }
            } 

        };


    }
    render() {
        return (
            <div>
                <Container>
                    <Row>
                        <Col sm="12" md={{ size: 8, offset: 2 }}>
                            <h2>Dashboard Monitoramento de Barragens</h2>
                        </Col>
                    </Row>
                    <Row>
                        <Col md="6">
                            <h4>Quantidade de Riscos x Criticidade</h4>
                            <Bar data={this.state.bar}></Bar>
                        </Col>
                        <Col md="6">
                            <h4>Quantidade de Riscos último 30 dias</h4>
                            <Doughnut data={this.state.doughnut}></Doughnut>
                        </Col>
                    </Row>
                    <Row>
                        <Col md="12">
                            <h4>Riscos Remanescentes no mês x Meta mensal</h4>
                            <Bar data={this.state.barMixedData} options={this.state.barMixedOptions}></Bar>
                        </Col>
                    </Row>
                </Container>
            </div>
        )
    }
}
