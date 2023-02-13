<template>
  <section class="stats body">
    <article
      v-if="
        chartData.marketPriceHistory.datasets[0].data.length &&
        chartData.marketPriceHistory.labels.length
      "
    >
      <Chart
        :chartData="chartData.marketPriceHistory"
        :chartOptions="{responsive: true}"
      />
    </article>
    <article
      v-if="
        chartData.avgBlockSize.datasets[0].data.length &&
        chartData.avgBlockSize.labels.length"
    >
      <Chart
        :chartData="chartData.avgBlockSize"
        :chartOptions="{responsive: true}"
      />
    </article>
  </section>
</template>

<script>
import { bitcoinService } from "@/services/bitcoin.service.js";
import Chart from "../cmps/chart.vue";

export default {
  data() {
    return {
      marketPriceHistory: [],
      avgBlockSize: [],
      chartData: {
        // labels: {
          marketPriceHistory: {
            labels: [],
            datasets: [
              {
                label: "Average USD market price",
                backgroundColor: "#f7931a99",
                data: [],
              },
            ],
          },
          avgBlockSize: {
            labels: [],
            datasets: [
              {
                label: "Average block size (MB)",
                backgroundColor: "#f7931a99",
                data: [],
              },
            ],
          },
        },
        // datasets: {
        //   marketPriceHistory: [],
        //   avgBlockSize: [],
        // },
    //   },
    };
  },
  

  //   chartData: {
  //     labels: null,
  //     datasets: [
  //       {
  //         label: "Value (USD)",
  //         backgroundColor: "#f7931a99",
  //         data: null,
  //       },
  //     ],
  //   },
  //   chartOptions: {responsive: true},

  created() {
    this.getMarketPriceHistory();
    this.getAvgBlockSize();
  },
  methods: {
    async getMarketPriceHistory() {
      //   const marketPriceHistory = await bitcoinService.getMarketPriceHistory();
      //   this.marketPriceHistory = marketPriceHistory;
      // return rate
      this.marketPriceHistory = await bitcoinService.getMarketPriceHistory();
      this.chartData.marketPriceHistory.labels =
        this.marketPriceHistory.values.map((value) => {
          const date = new Date(value.x * 1000);
          return `${date.getDate() + 1}.${date.getMonth() + 1}`;
        });
      this.chartData.marketPriceHistory.datasets[0].data =
        this.marketPriceHistory.values.map((value) => value.y);
    },
    async getAvgBlockSize() {
      this.avgBlockSize = await bitcoinService.getAvgBlockSize();
      this.chartData.avgBlockSize.labels = this.avgBlockSize.values.map(
        (value) => {
          const date = new Date(value.x * 1000);
          return `${date.getDate() + 1}.${date.getMonth() + 1}`;
        }
      );
      this.chartData.avgBlockSize.datasets[0].data = this.avgBlockSize.values.map(
        (value) => value.y
      );
    },
  },
  components: {
    Chart,
  },
};
</script>

