import _ from "lodash";
import { PieChart, Pie, Cell, Label } from "recharts";

export const DonutChart = ({ label, value }: DoughnutChartProps) => {
    const data = [
        {
            label: "Autre",
            value: 100 - value,
            color: "rgb(217 217 217 / 1)",
        },
        {
            label,
            value,
            color: "rgb(228 38 14 / 1)",
        },
    ];

    return (
        <PieChart width={80} height={80}>
            <Pie
                data={data}
                dataKey="value"
                outerRadius={38}
                innerRadius={30}
                startAngle={-270}
                fill="rgb(217 217 217 / 1)"
            >
                {data?.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry?.color} />
                ))}
                <Label
                    fill="rgb(228 38 14 / 1)"
                    fontWeight={600}
                    position="center"
                >
                    {`${_.round(value, 2).toString()}%`}
                </Label>
            </Pie>
        </PieChart>
    );
};

type DoughnutChartProps = {
    label?: string;
    value?: number;
};
