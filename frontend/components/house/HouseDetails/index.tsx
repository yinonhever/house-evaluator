import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import { HouseData } from "@/lib/types";
import styles from "./HouseDetails.module.scss";
import { formatToPct } from "@/lib/functions";

export default function HouseDetails({ house }: { house: HouseData }) {
  return (
    <Card elevation={3} sx={{ maxWidth: 700, margin: "auto", p: 3 }}>
      <div className={styles.list}>
        <div className={styles.row}>
          <Typography variant="h6" sx={{ fontWeight: 700 }}>
            Address
          </Typography>
          <Typography sx={{ mb: 1.5, fontSize: 17 }}>
            {house.address}
          </Typography>
        </div>
        <div className={styles.row}>
          <Typography variant="h6" sx={{ fontWeight: 700 }}>
            Current value
          </Typography>
          <Typography sx={{ mb: 1.5, fontSize: 17 }}>
            ${house.currentValue.toLocaleString()}
          </Typography>
        </div>
        <div className={styles.row}>
          <Typography variant="h6" sx={{ fontWeight: 700 }}>
            Loan amount
          </Typography>
          <Typography sx={{ mb: 1.5, fontSize: 17 }}>
            ${house.loanAmount.toLocaleString()}
          </Typography>
        </div>
        <div className={styles.row}>
          <Typography variant="h6" sx={{ fontWeight: 700 }}>
            Risk
          </Typography>
          <Typography sx={{ mb: 1.5, fontSize: 17 }}>
            {formatToPct(house.risk)}
          </Typography>
        </div>
      </div>
    </Card>
  );
}
