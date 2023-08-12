<script lang="ts">
  import * as d3 from 'd3';
  import type { FeatureCollection } from 'geojson';
  import { onMount } from 'svelte';

  let container: HTMLDivElement;

  const width = 975;
  const height = 610;
  onMount(async () => {
    var projection = d3.geoMercator();

    var path = d3.geoPath().projection(projection);

    const countries = (await d3.json('/worldmap.geojson')) as FeatureCollection;
    console.log('geojson', countries);

    function handleZoom(event: any) {
      const { transform } = event;
      g.attr('transform', transform);
      g.attr('stroke-width', 1 / transform.k);
    }
    const zoom = d3.zoom().scaleExtent([1, 8]).on('zoom', handleZoom) as any;

    const svg = d3.select('#worldmap');

    const g = svg.append('g');

    g.selectAll('path')
      .data(countries.features)
      .enter()
      .append('path')
      .attr('d', path)
      .on('mouseover', function (d) {
        console.log('', d3.select(d));
        d3.select(this).classed('fill-[#2680eb]', true);
      })
      .on('mouseout', function (d) {
        d3.select(this).classed('fill-[#2680eb]', false);
      });

    g.selectAll('path').attr('fill', 'transparent').attr('stroke', '#2680eb');

    svg.call(zoom);
  });
</script>

<div bind:this={container}>
  <svg
    id="worldmap"
    viewBox="0 -{height / 3} {width} {height}"
    {width}
    {height}
    class="h-auto max-w-full"
  />
</div>
