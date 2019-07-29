import React from 'react';
import { connect } from 'react-redux';
import { IRootState } from '../../../store';
import moment from 'moment';
import { Grid, Paper, withStyles, Theme, Typography, Collapse } from '@material-ui/core';
import { Line } from 'react-chartjs-2';
import { Sample } from '../../../lib/sample';
import { ISample } from '../../../db';

class SamplesChart extends React.Component<ChartProps, ChartState> {
	sampleService = new Sample();
	state: ChartState = {
		samples: [],
		chartData: { dates: [], qualities: [] }
	};

	componentDidMount() {
		if (this.props.patientId !== null && this.props.showChart) {
			this.setState(
				{
					samples: this.sampleService.getByPatientId(this.props.patientId, null, { field: 'date', direction: 'asc' })
				},
				() => {
					this.setState({
						chartData: this.mapData()
					});
				}
			);
		}
	}

	componentDidUpdate(prevProps: ChartProps) {
		if (prevProps.patientId !== this.props.patientId || prevProps.showChart != this.props.showChart) {
			if (this.props.patientId !== null) {
				this.setState(
					{
						samples: this.sampleService.getByPatientId(this.props.patientId, null, { field: 'date', direction: 'asc' })
					},
					() => {
						this.setState({
							chartData: this.mapData()
						});
					}
				);
			}
		}
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

	render() {
		const placeholder = (
			<div className={this.props.classes.placeholder}>
				<Typography variant="h5">
					{this.props.patientId !== null && this.state.samples.length === 0 ? 'Patient has no samples' : ''}
					{this.props.patientId === null && this.state.samples.length === 0 ? 'Select pateint to view chart' : ''}
				</Typography>
			</div>
		);

		const heading = (
			<Grid container className={this.props.classes.header}>
				<Grid item>
					<Typography variant="h5">Sample Quality Chart</Typography>
				</Grid>
			</Grid>
		);

		const options = {
			scales: {
				yAxes: [
					{
						scaleLabel: {
							display: false,
							labelString: '',
							fontSize: 18
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
							if (tooltipItem.yLabel === 1) {
								tooltipItem.yLabel = 'Low';
							}
							if (tooltipItem.yLabel === 2) {
								tooltipItem.yLabel = 'Medium';
							}
							if (tooltipItem.yLabel === 3) {
								tooltipItem.yLabel = 'High';
							}
						}
						label += tooltipItem.yLabel;
						return label;
					}
				}
			}
		};

		const data = {
			labels: [ ...this.state.chartData.dates ],
			datasets: [
				{
					label: 'Quality',
					data: [ ...this.state.chartData.qualities ],
					backgroundColor: 'pink'
				}
			]
		};

		return (
			<Collapse in={this.props.showChart}>
				<Paper>
					{this.props.patientId !== null && this.state.samples.length !== 0 ? heading : null}
					<div className={this.props.classes.chartWrapper}>
						{this.props.patientId === null || this.state.samples.length === 0 ? placeholder : null}
						<Line data={data} options={options} />
					</div>
				</Paper>
			</Collapse>
		);
	}
}

type ChartData = { dates: string[]; qualities: number[] };

interface ChartState {
	samples: ISample[];
	chartData: ChartData;
}

interface ChartProps {
	classes: any;
	showChart: boolean;
	patientId: number | null;
}

const mapStateToProps = (state: IRootState) => {
	return {
		patientId: state.patientSamples.patientId
	};
};
const useStyles = withStyles((theme: Theme) => {
	return {
		chartWrapper: {
			position: 'relative'
		},
		placeholder: {
			position: 'absolute',
			height: '100%',
			width: '100%',
			color: theme.palette.grey[300],
			textAlign: 'center',
			display: 'flex',
			justifyContent: 'center',
			alignItems: 'center',
			backgroundColor: '#fff'
		},
		header: {
			paddingTop: theme.spacing(2),
			paddingBottom: theme.spacing(2),
			paddingLeft: theme.spacing(4),
			paddingRigth: theme.spacing(4)
		}
	};
});

const connected = connect(mapStateToProps)(useStyles(SamplesChart));

export { connected as SamplesChart };
