#include <stdio.h>
#include <math.h>
int main() {
	int n;
	int cnt = 0;
	int i = 0;
	int numOfPrime = 0;
	printf("input n : ");
	scanf("%d", &n);

	int* primes = malloc(sizeof(int) * n);
	primes[0] = 2;
	while(cnt < n)
	{
		int isPrime = 1;
		for (int p = 0; primes[p] < sqrt((double)n); p++) 
		{
			if (n % primes[p] == 0)
			{
				isPrime = 0;
				break;
			}
		}
		if (isPrime)
		{
			printf("%d ", i);
			primes[numOfPrime++] = i;
			cnt++;
		}
		if (cnt % 20 == 0)
			puts("");
		i++;
	}
}