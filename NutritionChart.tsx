import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from "recharts";

interface NutritionData {
  name: string;
  traditional: number;
  healthy: number;
}

interface NutritionChartProps {
  data: NutritionData[];
}

/**
 * Nutrition comparison chart using Recharts
 * Displays traditional vs healthy nutrition values in a bar chart
 */
export function NutritionChart({ data }: NutritionChartProps) {
  const COLORS = {
    traditional: "#C9A87C", // Sandy brown
    healthy: "#6B8E23", // Olive green
  };

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-card border border-border rounded-lg p-3 shadow-lg">
          <p className="font-semibold text-foreground">{payload[0].payload.name}</p>
          <p className="text-sm text-muted-foreground">
            التقليدي: <span className="font-bold" style={{ color: COLORS.traditional }}>
              {payload[0].value}
            </span>
          </p>
          {payload[1] && (
            <p className="text-sm text-muted-foreground">
              الصحي: <span className="font-bold" style={{ color: COLORS.healthy }}>
                {payload[1].value}
              </span>
            </p>
          )}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="w-full h-96 bg-secondary/20 rounded-lg p-4">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={{ top: 20, right: 30, left: 0, bottom: 20 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
          <XAxis 
            dataKey="name" 
            tick={{ fill: "var(--color-muted-foreground)", fontSize: 12 }}
          />
          <YAxis 
            tick={{ fill: "var(--color-muted-foreground)", fontSize: 12 }}
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend 
            wrapperStyle={{ paddingTop: "20px" }}
            formatter={(value) => (
              <span style={{ color: "var(--color-foreground)" }}>
                {value === "traditional" ? "النسخة التقليدية" : "النسخة الصحية"}
              </span>
            )}
          />
          <Bar dataKey="traditional" fill={COLORS.traditional} radius={[8, 8, 0, 0]} />
          <Bar dataKey="healthy" fill={COLORS.healthy} radius={[8, 8, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
