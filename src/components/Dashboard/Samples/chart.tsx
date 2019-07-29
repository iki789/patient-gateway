import React from 'react';
import moment from 'moment';
import { Paper } from '@material-ui/core';
import { Line } from 'react-chartjs-2';
import { Sample } from '../../../lib/sample';
import { ISample } from '../../../db';

export class SamplesChart extends React.Component<{}, ChartState> {
	sampleService = new Sample();
	state: ChartState = {
		samples: [],
		chartData: { dates: [], qualities: [] }
	};

	componentDidMount() {
		this.setState(
			{
				samples: this.sampleService.getByPatientId(2, null, { field: 'date', direction: 'asc' })
			},
			() => {
				this.setState({
					chartData: this.mapData()
				});
			}
		);
	}

	mapData = (): ChartData => {
		const { samples } = this.state;
		let data: ChartData = { dates: [], qualities: [] };
		for (let i = 0; i < samples.length; i++) {
			if (samples[i].quality === 'low') {
				data.qualities.push(1);
			}
			if (samples[i].quality === 'medium') {
				data.qualities.push(2);
			}
			if (samples[i].quality === 'high') {
				data.qualities.push(3);
			}
			data.dates.push(moment(samples[i].date).format('DD MMM YYYY'));
		}
		return data;
	};

	options = {
		scales: {
			yAxes: [
				{
					scaleLabel: {
						display: true,
						labelString: 'Quality',
						fontSize: 22
					},
					ticks: {
						display: false,
						max: 4,
						min: 0
					}
				}
			]
		},
		legend: {
			display: false
		},
		tooltips: {
			callbacks: {
				label: function(tooltipItem: any, data: any) {
					var label = data.datasets[tooltipItem.datasetIndex].label || '';

					if (label) {
						label += ': ';
					}
					if (tooltipItem.yLabel) {
						if (tooltipItem.yLabel == 1) {
							tooltipItem.yLabel = 'Low';
						}
						if (tooltipItem.yLabel == 2) {
							tooltipItem.yLabel = 'Medium';
						}
						if (tooltipItem.yLabel == 3) {
							tooltipItem.yLabel = 'High';
						}
					}
					label += tooltipItem.yLabel;
					return label;
				}
			}
		}
	};

	render() {
		return (
			<Paper>
				<Line
					data={{
						labels: [ ...this.state.chartData.dates ],
						datasets: [
							{
								label: 'Quality',
								data: [ ...this.state.chartData.qualities ],
								backgroundColor: 'pink'
							}
						]
					}}
					options={this.options}
				/>
			</Paper>
		);
	}
}

type ChartData = { dates: string[]; qualities: number[] };

interface ChartState {
	samples: ISample[];
	chartData: ChartData;
}
